import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';
import type { CcProposal } from './supabase';
import type { WorkerEnv } from './env';

const ALLOWED_SET = new Set(['summary', 'notes', 'title']);

export type YamlPatch = {
  set?: Record<string, string>;
  add_sources?: Array<{
    source_type: string;
    reference: string;
    url?: string | null;
    note?: string | null;
  }>;
};

function githubHeaders(token: string): Record<string, string> {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'catholiccontext-proposal-bot',
  };
}

function encodeUtf8ToBase64(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function decodeBase64ToUtf8(value: string): string {
  const binary = atob(value.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function slugToContextPath(slug: string): string {
  const clean = slug.replace(/^\/+/, '').replace(/\.ya?ml$/, '');
  return `context/${clean}.yaml`;
}

function proposalJson(proposal: CcProposal, patch: YamlPatch, targetPath: string): string {
  return `${JSON.stringify(
    {
      target_path: targetPath,
      set: patch.set ?? {},
      add_sources: patch.add_sources ?? [],
      reviewer: proposal.proposer_public_username,
      proposal_id: proposal.id,
      context_id: proposal.context_id,
      category: proposal.category,
      problem: proposal.problem,
      proposed_change: proposal.proposed_change,
      rationale: proposal.rationale,
      supporting_sources: proposal.supporting_sources,
      material_change: proposal.material_change,
    },
    null,
    2,
  )}\n`;
}

function applyPatchToYaml(raw: string, patch: YamlPatch): { yaml: string } | { error: string } {
  const data = parseYaml(raw) as Record<string, unknown>;
  if (!data || typeof data !== 'object') return { error: 'Target YAML is not an object' };

  const review = data.review as { status?: string } | undefined;
  if (review?.status === 'theologically-reviewed') {
    return { error: 'Refusing to patch a theologically-reviewed object' };
  }

  for (const [key, value] of Object.entries(patch.set ?? {})) {
    if (!ALLOWED_SET.has(key)) return { error: `Unsupported set field: ${key}` };
    data[key] = value;
  }
  for (const source of patch.add_sources ?? []) {
    if (!source.source_type || !source.reference) {
      return { error: 'add_sources entries need source_type and reference' };
    }
    const sources = Array.isArray(data.sources) ? data.sources : [];
    sources.push({
      source_type: source.source_type,
      reference: source.reference,
      url: source.url ?? null,
      note: source.note ?? null,
    });
    data.sources = sources;
  }

  if (review && typeof review === 'object') {
    review.status = 'draft';
  }

  return {
    yaml: `# DRAFT — theological review pending\n${stringifyYaml(data, { lineWidth: 88 })}`,
  };
}

async function putFile(
  env: WorkerEnv,
  path: string,
  content: string,
  branch: string,
  message: string,
  sha?: string,
): Promise<{ ok: true } | { error: string }> {
  const token = env.GITHUB_TOKEN!;
  const repo = env.GITHUB_REPO || 'brennandecker/catholic-context';
  const [owner, repoName] = repo.split('/');
  const body: Record<string, unknown> = {
    message,
    content: encodeUtf8ToBase64(content),
    branch,
  };
  if (sha) body.sha = sha;
  const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/contents/${path}`, {
    method: 'PUT',
    headers: githubHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) return { error: `Failed to write ${path}: ${await res.text()}` };
  return { ok: true };
}

async function getFile(
  env: WorkerEnv,
  path: string,
  ref: string,
): Promise<{ content: string; sha: string } | { error: string }> {
  const token = env.GITHUB_TOKEN!;
  const repo = env.GITHUB_REPO || 'brennandecker/catholic-context';
  const [owner, repoName] = repo.split('/');
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/contents/${path}?ref=${encodeURIComponent(ref)}`,
    { headers: githubHeaders(token) },
  );
  if (!res.ok) return { error: `Failed to read ${path}: ${await res.text()}` };
  const data = (await res.json()) as { content?: string; sha?: string; encoding?: string };
  if (!data.content || !data.sha) return { error: `Missing content for ${path}` };
  return { content: decodeBase64ToUtf8(data.content), sha: data.sha };
}

export async function openProposalPullRequest(
  env: WorkerEnv,
  proposal: CcProposal,
  patch: YamlPatch = {},
): Promise<{ prNumber: number; prUrl: string } | { error: string }> {
  const token = env.GITHUB_TOKEN;
  if (!token) {
    return {
      error:
        'GITHUB_TOKEN is not configured. Proposal saved; open a PR after the founder adds a token with contents:write and pull_requests:write.',
    };
  }

  const repo = env.GITHUB_REPO || 'brennandecker/catholic-context';
  const base = env.GITHUB_PR_BASE || 'main';
  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) return { error: 'Invalid GITHUB_REPO' };
  const headers = githubHeaders(token);

  const refRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/git/ref/heads/${base}`, {
    headers,
  });
  if (!refRes.ok) {
    return { error: `Failed to read base branch ${base}: ${await refRes.text()}` };
  }
  const refData = (await refRes.json()) as { object: { sha: string } };
  const baseSha = refData.object.sha;

  const branch = `proposal/${proposal.proposer_public_username}/${proposal.id.slice(0, 8)}`;
  const createRef = await fetch(`https://api.github.com/repos/${owner}/${repoName}/git/refs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ref: `refs/heads/${branch}`,
      sha: baseSha,
    }),
  });
  if (!createRef.ok && createRef.status !== 422) {
    return { error: `Failed to create branch: ${await createRef.text()}` };
  }

  const targetPath = slugToContextPath(proposal.context_slug);
  const jsonPath = `proposals/open/${proposal.id}.json`;
  const jsonPut = await putFile(
    env,
    jsonPath,
    proposalJson(proposal, patch, targetPath),
    branch,
    `proposal: ${proposal.context_slug} by ${proposal.proposer_public_username}`,
  );
  if ('error' in jsonPut) return jsonPut;

  const hasPatch =
    Object.keys(patch.set ?? {}).length > 0 || (patch.add_sources && patch.add_sources.length > 0);
  if (hasPatch) {
    const current = await getFile(env, targetPath, branch);
    if ('error' in current) return current;
    const applied = applyPatchToYaml(current.content, patch);
    if ('error' in applied) return applied;
    const yamlPut = await putFile(
      env,
      targetPath,
      applied.yaml,
      branch,
      `draft patch: ${proposal.context_slug}`,
      current.sha,
    );
    if ('error' in yamlPut) return yamlPut;
  }

  const prRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/pulls`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: `Correction: ${proposal.context_title ?? proposal.context_slug} (@${proposal.proposer_public_username})`,
      head: branch,
      base,
      body: [
        `Proposed by **\`${proposal.proposer_public_username}\`**`,
        '',
        `Proposal id: \`${proposal.id}\``,
        `Context: \`${proposal.context_id}\``,
        `Target: \`${targetPath}\``,
        `Material change: **${proposal.material_change ? 'yes' : 'no'}**`,
        '',
        hasPatch
          ? 'This PR patches `context/**/*.yaml` and resets `review.status` to `draft`.'
          : 'This PR records a structured proposal JSON. Apply it with `python3 scripts/apply-proposal.py --proposal proposals/open/<id>.json` after mapping fields.',
        '',
        'Automation **must not** set `theologically-reviewed`.',
      ].join('\n'),
    }),
  });
  if (!prRes.ok) {
    return { error: `Failed to open PR: ${await prRes.text()}` };
  }
  const pr = (await prRes.json()) as { number: number; html_url: string };
  return { prNumber: pr.number, prUrl: pr.html_url };
}

export async function commentOnPullRequest(
  env: WorkerEnv,
  prNumber: number,
  body: string,
): Promise<void> {
  const token = env.GITHUB_TOKEN;
  if (!token || !prNumber) return;
  const repo = env.GITHUB_REPO || 'brennandecker/catholic-context';
  const [owner, repoName] = repo.split('/');
  await fetch(`https://api.github.com/repos/${owner}/${repoName}/issues/${prNumber}/comments`, {
    method: 'POST',
    headers: githubHeaders(token),
    body: JSON.stringify({ body }),
  });
}
