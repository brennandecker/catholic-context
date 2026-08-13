import type { WorkerEnv } from './env';

export type CcProfile = {
  user_id: string;
  public_username: string;
  display_name: string | null;
};

export type CcReviewer = {
  user_id: string;
  role: 'community' | 'theological' | 'maintainer';
  active: boolean;
  appointed_at: string;
};

export type CcProposal = {
  id: string;
  context_id: string;
  context_slug: string;
  context_title: string | null;
  proposer_user_id: string;
  proposer_public_username: string;
  category: string;
  problem: string;
  proposed_change: string;
  rationale: string;
  supporting_sources: string | null;
  material_change: boolean;
  status: string;
  github_pr_number: number | null;
  github_pr_url: string | null;
  github_error: string | null;
  reviewer_user_id: string | null;
  reviewer_public_username: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
};

function restUrl(env: WorkerEnv, path: string, query?: Record<string, string>): string {
  const url = new URL(`${env.PUBLIC_SUPABASE_URL}/rest/v1/${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

async function supabaseFetch(
  env: WorkerEnv,
  path: string,
  init: RequestInit & { query?: Record<string, string>; service?: boolean } = {},
): Promise<Response> {
  const key = init.service
    ? env.SUPABASE_SERVICE_ROLE_KEY || env.PUBLIC_SUPABASE_ANON_KEY
    : env.PUBLIC_SUPABASE_ANON_KEY;
  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  if (!headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${key}`);
  }
  headers.set('Content-Type', 'application/json');
  return fetch(restUrl(env, path, init.query), { ...init, headers });
}

export async function getUserFromBearer(
  env: WorkerEnv,
  authorization: string | null,
): Promise<{ id: string; email?: string } | null> {
  if (!authorization?.toLowerCase().startsWith('bearer ')) return null;
  const token = authorization.slice(7).trim();
  if (!token) return null;

  const res = await fetch(`${env.PUBLIC_SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: env.PUBLIC_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { id?: string; email?: string };
  if (!data.id) return null;
  return { id: data.id, email: data.email };
}

export async function getProfile(
  env: WorkerEnv,
  userId: string,
  userJwt: string,
): Promise<CcProfile | null> {
  const res = await supabaseFetch(env, 'cc_profiles', {
    query: {
      select: 'user_id,public_username,display_name',
      user_id: `eq.${userId}`,
      limit: '1',
    },
    headers: { Authorization: `Bearer ${userJwt}` },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as CcProfile[];
  return rows[0] ?? null;
}

export async function getReviewer(
  env: WorkerEnv,
  userId: string,
  userJwt: string,
): Promise<CcReviewer | null> {
  const res = await supabaseFetch(env, 'cc_reviewers', {
    query: {
      select: 'user_id,role,active,appointed_at',
      user_id: `eq.${userId}`,
      active: 'eq.true',
      limit: '1',
    },
    headers: { Authorization: `Bearer ${userJwt}` },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as CcReviewer[];
  return rows[0] ?? null;
}

export async function ensureProfileForUser(
  env: WorkerEnv,
  user: { id: string; email?: string },
): Promise<CcProfile | null> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) return null;

  const existing = await supabaseFetch(env, 'cc_profiles', {
    service: true,
    query: {
      select: 'user_id,public_username,display_name',
      user_id: `eq.${user.id}`,
      limit: '1',
    },
  });
  if (existing.ok) {
    const rows = (await existing.json()) as CcProfile[];
    if (rows[0]) return rows[0];
  }

  // Trigger may have missed (user existed before migration). Create a default profile.
  const username = `cc_u_${user.id.replace(/-/g, '').slice(0, 12)}`;
  const insert = await supabaseFetch(env, 'cc_profiles', {
    service: true,
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      user_id: user.id,
      public_username: username,
      display_name: user.email?.split('@')[0] ?? null,
    }),
  });
  if (!insert.ok) return null;
  const created = (await insert.json()) as CcProfile[];
  return created[0] ?? null;
}

export async function insertProposal(
  env: WorkerEnv,
  userJwt: string,
  proposal: Record<string, unknown>,
): Promise<{ data?: CcProposal; error?: string }> {
  const res = await supabaseFetch(env, 'cc_proposals', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userJwt}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(proposal),
  });
  const body = await res.json();
  if (!res.ok) {
    return { error: typeof body === 'object' && body && 'message' in body ? String((body as { message: string }).message) : 'Failed to create proposal' };
  }
  const rows = body as CcProposal[];
  return { data: rows[0] };
}

export async function updateProposal(
  env: WorkerEnv,
  userJwt: string,
  id: string,
  patch: Record<string, unknown>,
): Promise<{ data?: CcProposal; error?: string }> {
  const res = await supabaseFetch(env, 'cc_proposals', {
    method: 'PATCH',
    query: { id: `eq.${id}` },
    headers: {
      Authorization: `Bearer ${userJwt}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify(patch),
  });
  const body = await res.json();
  if (!res.ok) {
    return { error: typeof body === 'object' && body && 'message' in body ? String((body as { message: string }).message) : 'Failed to update proposal' };
  }
  const rows = body as CcProposal[];
  return { data: rows[0] };
}

export async function listProposals(
  env: WorkerEnv,
  userJwt: string,
): Promise<CcProposal[]> {
  const res = await supabaseFetch(env, 'cc_proposals', {
    query: {
      select: '*',
      order: 'created_at.desc',
    },
    headers: { Authorization: `Bearer ${userJwt}` },
  });
  if (!res.ok) return [];
  return (await res.json()) as CcProposal[];
}

export async function getProposal(
  env: WorkerEnv,
  userJwt: string,
  id: string,
): Promise<CcProposal | null> {
  const res = await supabaseFetch(env, 'cc_proposals', {
    query: {
      select: '*',
      id: `eq.${id}`,
      limit: '1',
    },
    headers: { Authorization: `Bearer ${userJwt}` },
  });
  if (!res.ok) return null;
  const rows = (await res.json()) as CcProposal[];
  return rows[0] ?? null;
}

export async function appointReviewerByEmail(
  env: WorkerEnv,
  input: {
    email: string;
    public_username: string;
    display_name?: string;
    role: 'community' | 'theological';
    notes?: string;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, error: 'SUPABASE_SERVICE_ROLE_KEY is not configured on the Worker' };
  }

  const email = input.email.trim().toLowerCase();
  const username = input.public_username.trim().toLowerCase();

  const inviteRes = await supabaseFetch(env, 'cc_reviewer_invites', {
    service: true,
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify({
      email,
      public_username: username,
      display_name: input.display_name ?? null,
      role: input.role,
      appointed_by: 'founder',
      notes: input.notes ?? null,
    }),
  });

  // Prefer upsert via delete+insert if unique conflict on upsert headers is awkward
  if (!inviteRes.ok) {
    await supabaseFetch(env, 'cc_reviewer_invites', {
      service: true,
      method: 'DELETE',
      query: { email: `eq.${email}` },
    });
    const retry = await supabaseFetch(env, 'cc_reviewer_invites', {
      service: true,
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        email,
        public_username: username,
        display_name: input.display_name ?? null,
        role: input.role,
        appointed_by: 'founder',
        notes: input.notes ?? null,
      }),
    });
    if (!retry.ok) {
      const err = await retry.text();
      return { ok: false, error: err || 'Failed to save invite' };
    }
  }

  // If the user already exists, attach profile/reviewer immediately.
  const userLookup = await fetch(
    `${env.PUBLIC_SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=200`,
    {
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (userLookup.ok) {
    const payload = (await userLookup.json()) as {
      users?: Array<{ id: string; email?: string }>;
    };
    const existing = payload.users?.find((u) => u.email?.toLowerCase() === email);
    if (existing) {
      await supabaseFetch(env, 'cc_profiles', {
        service: true,
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({
          user_id: existing.id,
          public_username: username,
          display_name: input.display_name ?? null,
        }),
      });
      await supabaseFetch(env, 'cc_reviewers', {
        service: true,
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify({
          user_id: existing.id,
          role: input.role,
          appointed_by: 'founder',
          active: true,
          notes: input.notes ?? 'Founder appointment',
        }),
      });
      await supabaseFetch(env, 'cc_reviewer_invites', {
        service: true,
        method: 'PATCH',
        query: { email: `eq.${email}` },
        body: JSON.stringify({
          consumed_at: new Date().toISOString(),
          consumed_user_id: existing.id,
        }),
      });
    }
  }

  return { ok: true };
}
