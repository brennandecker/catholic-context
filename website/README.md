# CatholicContext.org website

Astro static site + Cloudflare Worker API for reviewer platform auth and proposals.

## Local development

```bash
cp .env.example .env   # if needed
npm install
npm run dev
```

`PUBLIC_SUPABASE_*` values are read at build time for browser auth pages.

## Deploy

```bash
npm run deploy
```

### Worker secrets

```bash
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put GITHUB_TOKEN
wrangler secret put FOUNDER_ADMIN_TOKEN
```

- `GITHUB_TOKEN` — PAT (or installation token) with `contents:write` and `pull_requests:write` on `brennandecker/catholic-context`
- `FOUNDER_ADMIN_TOKEN` — random string used as `X-Founder-Token` for appointments
- `SUPABASE_SERVICE_ROLE_KEY` — required for founder appoint + profile backfill

### Appoint a reviewer (founder)

```bash
curl -X POST https://catholiccontext.org/api/admin/appoint \
  -H "Content-Type: application/json" \
  -H "X-Founder-Token: $FOUNDER_ADMIN_TOKEN" \
  -d '{
    "email": "channing@example.com",
    "public_username": "channing",
    "display_name": "Channing Decker",
    "role": "theological",
    "notes": "First founding theological reviewer"
  }'
```

Then Channing signs in at `/login` with that email (magic link). Supabase Auth redirect allow-list must include:

- `https://catholiccontext.org/auth/callback`
- `http://localhost:4321/auth/callback` (dev)
