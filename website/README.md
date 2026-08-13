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

Worker name: `catholiccontext` (see `wrangler.jsonc`).

## Content boundary

Canonical theological content lives in the repository (`context/`, `harness/`, `evals/`, `sources/`, `schema/`). Do not hard-code a second proprietary source of truth into React/Astro components.
