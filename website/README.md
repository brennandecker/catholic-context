# CatholicContext.org

Public website for [Catholic Context](https://github.com/brennandecker/catholic-context) — the human-readable interface to open Catholic knowledge, Harness, and Evals.

## Design source of truth

Before changing UI, read in order:

1. [`../docs/DESIGN_FIDELITY.md`](../docs/DESIGN_FIDELITY.md)
2. [`../docs/DESIGN_SYSTEM.md`](../docs/DESIGN_SYSTEM.md)
3. [`../docs/WEBSITE_IMPLEMENTATION.md`](../docs/WEBSITE_IMPLEMENTATION.md)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run validate
```

This builds the site (schema-validating `context/**/*.yaml`) and runs `python3 ../scripts/run-evals.py`.

The build loads and schema-validates YAML knowledge objects from `../context/`. Invalid canonical content fails the build.

## Deploy to Cloudflare Workers

Static assets are deployed with Wrangler:

```bash
npm run deploy
```

Requires `CLOUDFLARE_API_TOKEN` (and optionally `CLOUDFLARE_ACCOUNT_ID`).

Worker name: `catholiccontext` (see `wrangler.jsonc`). `www.catholiccontext.org` 301s to the apex domain. Static discovery files (`/sitemap.xml`, `/robots.txt`, `/llms.txt`) are generated at build time from `context/**/*.yaml` so crawlers never depend on a runtime filesystem.

Pushes to `main` deploy via `.github/workflows/deploy-website.yml` once these GitHub Actions secrets exist:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- optional `PUBLIC_GOOGLE_SITE_VERIFICATION` (Search Console HTML-tag content)

After the first production deploy, add `https://catholiccontext.org/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Do not request indexing of `/login`, `/account`, `/propose`, or `/review/proposal`.

Worker secrets for the appointed-reviewer loop (`wrangler secret put` in `website/`):

- `SUPABASE_SERVICE_ROLE_KEY`
- `GITHUB_TOKEN` (contents + pull_requests)
- `FOUNDER_ADMIN_TOKEN`

Apply `supabase/migrations/001_reviewer_platform.sql` to the Supabase project before appointing reviewers. Public corrections still use GitHub Issues with no account.

## Content boundary

Canonical theological content lives in the repository (`context/`, `harness/`, `evals/`, `sources/`, `schema/`). Do not hard-code a second proprietary source of truth into React/Astro components.
