import { badRequest, json, type WorkerEnv } from './env';
import { commentOnPullRequest, openProposalPullRequest, type YamlPatch } from './github';
import {
  appointReviewerByEmail,
  ensureProfileForUser,
  getProfile,
  getProposal,
  getReviewer,
  getUserFromBearer,
  insertProposal,
  listProposals,
  updateProposal,
} from './supabase';

async function requireReviewer(request: Request, env: WorkerEnv) {
  const user = await getUserFromBearer(env, request.headers.get('Authorization'));
  if (!user) return { error: badRequest('Sign in required', 401) };

  let profile = await getProfile(env, user.id, request.headers.get('Authorization')!.slice(7));
  if (!profile) {
    profile = await ensureProfileForUser(env, user);
  }
  if (!profile) return { error: badRequest('Profile not found. Try signing out and back in.', 404) };

  const jwt = request.headers.get('Authorization')!.slice(7);
  const reviewer = await getReviewer(env, user.id, jwt);
  if (!reviewer) return { error: badRequest('Founder appointment required to use reviewer tools', 403) };

  return { user, profile, reviewer, jwt };
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === 'www.catholiccontext.org') {
      url.hostname = 'catholiccontext.org';
      return Response.redirect(url.toString(), 301);
    }

    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': url.origin,
          'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        },
      });
    }

    try {
      if (url.pathname === '/api/me' && request.method === 'GET') {
        const user = await getUserFromBearer(env, request.headers.get('Authorization'));
        if (!user) return badRequest('Sign in required', 401);
        const jwt = request.headers.get('Authorization')!.slice(7);
        let profile = await getProfile(env, user.id, jwt);
        if (!profile) profile = await ensureProfileForUser(env, user);
        const reviewer = profile ? await getReviewer(env, user.id, jwt) : null;
        return json({
          user: { id: user.id, email: user.email },
          profile,
          reviewer,
        });
      }

      if (url.pathname === '/api/proposals' && request.method === 'GET') {
        const auth = await requireReviewer(request, env);
        if ('error' in auth) return auth.error;
        const proposals = await listProposals(env, auth.jwt);
        return json({ proposals });
      }

      if (url.pathname === '/api/proposals' && request.method === 'POST') {
        const auth = await requireReviewer(request, env);
        if ('error' in auth) return auth.error;

        const body = (await request.json()) as Record<string, unknown>;
        const required = ['context_id', 'context_slug', 'category', 'problem', 'proposed_change', 'rationale'] as const;
        for (const key of required) {
          if (typeof body[key] !== 'string' || !String(body[key]).trim()) {
            return badRequest(`Missing field: ${key}`);
          }
        }

        const created = await insertProposal(env, auth.jwt, {
          context_id: String(body.context_id).trim(),
          context_slug: String(body.context_slug).trim(),
          context_title: typeof body.context_title === 'string' ? body.context_title : null,
          proposer_user_id: auth.user.id,
          proposer_public_username: auth.profile.public_username,
          category: String(body.category).trim(),
          problem: String(body.problem).trim(),
          proposed_change: String(body.proposed_change).trim(),
          rationale: String(body.rationale).trim(),
          supporting_sources:
            typeof body.supporting_sources === 'string' ? body.supporting_sources : null,
          material_change: Boolean(body.material_change),
          status: 'draft',
        });
        if (!created.data) return badRequest(created.error || 'Create failed', 500);

        const patch: YamlPatch = { set: {}, add_sources: [] };
        if (typeof body.set_summary === 'string' && body.set_summary.trim()) {
          patch.set = { ...patch.set, summary: body.set_summary.trim() };
        }
        if (typeof body.set_notes === 'string' && body.set_notes.trim()) {
          patch.set = { ...patch.set, notes: body.set_notes.trim() };
        }
        if (typeof body.add_source_reference === 'string' && body.add_source_reference.trim()) {
          patch.add_sources = [
            {
              source_type:
                typeof body.add_source_type === 'string' && body.add_source_type.trim()
                  ? body.add_source_type.trim()
                  : 'other',
              reference: body.add_source_reference.trim(),
              url:
                typeof body.add_source_url === 'string' && body.add_source_url.trim()
                  ? body.add_source_url.trim()
                  : null,
              note: null,
            },
          ];
        }

        const pr = await openProposalPullRequest(env, created.data, patch);
        if ('prNumber' in pr) {
          const updated = await updateProposal(env, auth.jwt, created.data.id, {
            status: 'pr_open',
            github_pr_number: pr.prNumber,
            github_pr_url: pr.prUrl,
            github_error: null,
          });
          return json({ proposal: updated.data ?? created.data }, 201);
        }

        const updated = await updateProposal(env, auth.jwt, created.data.id, {
          github_error: pr.error,
        });
        return json({ proposal: updated.data ?? created.data, warning: pr.error }, 201);
      }

      const proposalMatch = url.pathname.match(/^\/api\/proposals\/([0-9a-f-]{36})$/i);
      if (proposalMatch && request.method === 'GET') {
        const auth = await requireReviewer(request, env);
        if ('error' in auth) return auth.error;
        const proposal = await getProposal(env, auth.jwt, proposalMatch[1]);
        if (!proposal) return badRequest('Not found', 404);
        return json({ proposal });
      }

      if (proposalMatch && request.method === 'PATCH') {
        const auth = await requireReviewer(request, env);
        if ('error' in auth) return auth.error;
        const proposal = await getProposal(env, auth.jwt, proposalMatch[1]);
        if (!proposal) return badRequest('Not found', 404);

        const body = (await request.json()) as {
          action?: string;
          review_notes?: string;
        };
        const action = body.action;
        if (!action || !['approve', 'request_changes', 'comment'].includes(action)) {
          return badRequest('action must be approve | request_changes | comment');
        }

        const notes = typeof body.review_notes === 'string' ? body.review_notes.trim() : '';
        let status = proposal.status;
        if (action === 'approve') status = 'approved';
        if (action === 'request_changes') status = 'changes_requested';

        const updated = await updateProposal(env, auth.jwt, proposal.id, {
          status,
          reviewer_user_id: auth.user.id,
          reviewer_public_username: auth.profile.public_username,
          review_notes: notes || proposal.review_notes,
        });

        if (proposal.github_pr_number) {
          const verb =
            action === 'approve'
              ? 'approved'
              : action === 'request_changes'
                ? 'requested changes on'
                : 'commented on';
          await commentOnPullRequest(
            env,
            proposal.github_pr_number,
            [
              `\`${auth.profile.public_username}\` ${verb} this proposal.`,
              notes ? `\n\n${notes}` : '',
            ].join(''),
          );
        }

        return json({ proposal: updated.data ?? proposal });
      }

      if (url.pathname === '/api/admin/appoint' && request.method === 'POST') {
        const token = request.headers.get('X-Founder-Token') || '';
        if (!env.FOUNDER_ADMIN_TOKEN || token !== env.FOUNDER_ADMIN_TOKEN) {
          return badRequest('Unauthorized', 401);
        }
        const body = (await request.json()) as {
          email?: string;
          public_username?: string;
          display_name?: string;
          role?: 'community' | 'theological';
          notes?: string;
        };
        if (!body.email || !body.public_username || !body.role) {
          return badRequest('email, public_username, and role are required');
        }
        const result = await appointReviewerByEmail(env, {
          email: body.email,
          public_username: body.public_username,
          display_name: body.display_name,
          role: body.role,
          notes: body.notes,
        });
        if (!result.ok) return badRequest(result.error, 500);
        return json({
          ok: true,
          message:
            'Invite saved. When that email completes magic-link login, they receive the platform username and reviewer role.',
        });
      }

      return badRequest('Not found', 404);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Server error';
      return json({ error: message }, 500);
    }
  },
};
