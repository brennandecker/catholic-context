import type { CcProposal } from './supabase';
import type { WorkerEnv } from './env';

function proposalMarkdown(proposal: CcProposal): string {
  return `---
proposal_id: ${proposal.id}
context_id: ${proposal.context_id}
context_slug: ${proposal.context_slug}
proposer: ${proposal.proposer_public_username}
category: ${proposal.category}
material_change: ${proposal.material_change}
status: ${proposal.status}
---

# Correction proposal

**Context:** ${proposal.context_title ?? proposal.context_slug}  
**Proposed by:** \`${proposal.proposer_public_username}\` (Catholic Context platform username — not a GitHub account)

## Category

${proposal.category}

## What is wrong

${proposal.problem}

## Proposed change

${proposal.proposed_change}

## Rationale

${proposal.rationale}

## Supporting sources

${proposal.supporting_sources?.trim() || '_None provided._'}

## Review impact

- [ ] Source fidelity affected
- [ ] Claim classification affected
- [ ] Material theological change: **${proposal.material_change ? 'yes' : 'no'}**
- [ ] Requires theological re-review if previously reviewed

---

Opened by the Catholic Context proposal bot for change management and open-source visibility.
`;
}

export async function openProposalPullRequest(
  env: WorkerEnv,
  proposal: CcProposal,
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

  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'catholiccontext-proposal-bot',
  };

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

  const path = `proposals/open/${proposal.id}.md`;
  const bytes = new TextEncoder().encode(proposalMarkdown(proposal));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const content = btoa(binary);
  const putFile = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `proposal: ${proposal.context_slug} by ${proposal.proposer_public_username}`,
        content,
        branch,
      }),
    },
  );
  if (!putFile.ok) {
    return { error: `Failed to write proposal file: ${await putFile.text()}` };
  }

  const prRes = await fetch(`https://api.github.com/repos/${owner}/${repoName}/pulls`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: `Correction: ${proposal.context_title ?? proposal.context_slug} (@${proposal.proposer_public_username})`,
      head: branch,
      base,
      body: [
        `Proposed by Catholic Context platform user **\`${proposal.proposer_public_username}\`** (unique platform ID; reviewer does not need a GitHub account).`,
        '',
        `Proposal id: \`${proposal.id}\``,
        `Context: \`${proposal.context_id}\``,
        `Material change: **${proposal.material_change ? 'yes' : 'no'}**`,
        '',
        'See the added file under `proposals/open/` for the full structured proposal.',
        '',
        'Reviewers should use the Catholic Context `/review` UI; maintainers merge on GitHub.',
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
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'catholiccontext-proposal-bot',
    },
    body: JSON.stringify({ body }),
  });
}
