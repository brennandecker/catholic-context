# Next five major features

This is the engineering plan for the next five features. Mission order and the community decision live in [`priorities.md`](priorities.md). Neighboring projects live in [`related-projects.md`](related-projects.md). API timing lives in [`API.md`](API.md).

These are **product slices**, not documentation chores. Each should land as working software or canonical data on `main`, with visible acceptance criteria.

## Codebase snapshot (what the plan is built on)

`main` is a specification tree plus one draft object (`context/sacraments/eucharist/real-presence.yaml`). There is no website, no eval runner, and no harness runtime on `main`.

In-flight branches already contain most of the raw material:

| Branch / PR | What it actually contains | Use for |
| --- | --- | --- |
| `cursor/catholiccontext-website-cloudflare-b569` | Astro static site, schema-validating `content.ts`, 11 v0.1 routes, 25 curated draft YAML, GitHub Issue correction CTA | Feature 1 |
| `cursor/source-fidelity-assessment-b569` | Schema v0.3 `source_fidelity`, Source Match UI | Feature 3 |
| `cursor/reviewer-correction-workflow-plan-b569` | Written reviewer loop; founding panel | Feature 5 (spec) |
| `cursor/reviewer-platform-auth-b569` | Magic-link auth, `/propose` `/review`, Worker, **1,196 imported drafts**, PR bot that writes `proposals/open/*.md` | Feature 5 (prototype); **do not merge the 1,196 YAML onto `main` yet** |
| this branch | Source registry, New Advent / CatholicOS evaluations, `external_ids`, priorities | Features 2–3 metadata |

Hard findings the features must respect:

- Website `evals.astro` **hardcodes** six founding prompts; it does not load `evals/`.
- Harness page loads only the first eight *Magnifica Humanitas* principles; planned dirs (`harness/reasoning/`, `boundaries/`, `implementations/`) do not exist.
- Website corpus: 25 objects, **all `draft`**, **zero `sources[].url`**.
- Reviewer-auth corpus: 1,196 objects, **all `draft`**, ~77% `classification: null`, mostly New Advent encyclopedia metadata — wrong shape for founding evals.
- Schema is already forked: v0.2 + `external_ids` (this branch) vs v0.3 + `source_fidelity` (fidelity/auth branches).
- Reviewer bot does **not** patch `context/**/*.yaml`. Approve does **not** merge or set `review.status`.

Landing order: **1 → 2 → 3 → 4 → 5**. Do not let Features 3–5 expand the encyclopedia before the spine exists.

---

## Feature 1 — Public knowledge site on `main`

**Job:** Make Catholic Context accessible. A human can search, open an object, see sources and review status, and suggest a correction — without Git fluency.

**Build from:** `origin/cursor/catholiccontext-website-cloudflare-b569` (`website/`). Keep **static Workers Assets** first. Do not bring reviewer-auth’s Worker, Supabase, or 1,196 YAML along for the ride.

**In scope**

- Merge `website/` onto `main` with the 25 curated drafts (or a subset if merge conflicts demand it).
- Preserve build-time Ajv validation in `website/src/lib/content.ts` (invalid YAML fails the build).
- Keep `ReviewBadge`, `Provenance`, `SourceList`, search, and the GitHub Issue correction CTA.
- Deploy `catholiccontext.org` from `main` as a static site.
- Make draft status unmistakable on every knowledge page.

**Out of scope**

- Auth, `/propose`, `/review`
- Vector search, chat, MCP
- Bulk entity import
- JSON-LD ecclesiastical claims
- Per-source detail routes (`/sources/[id]`) — registry index is enough for this slice

**Key files**

- `website/src/lib/content.ts`, `types.ts`, `search.ts`, `site.ts`
- `website/src/pages/knowledge/[...slug].astro`
- `website/wrangler.jsonc` (static `assets` mode)
- `context/**/*.yaml` (the 25, not the 1,196)

**Acceptance**

1. `main` contains `website/` and builds with `npm run build` from `website/`.
2. `/`, `/knowledge`, `/search`, `/sources`, `/harness`, `/evals`, `/governance` render.
3. Opening Real Presence (or equivalent) shows summary, sources, `draft` badge, GitHub file link, Suggest a correction.
4. A malformed YAML file fails the build.
5. No object is labeled verified, official, or Church-approved.

**Depends on:** nothing. **Unblocks:** 2–5 becoming visible.

---

## Feature 2 — Catechetical spine

**Job:** Make Catholic Context accurate where people and AIs already fail. Twelve teaching objects aligned to the founding eval table, not a thousand encyclopedia stubs.

**Build from:** hand-authored YAML under `context/`. Use the website branch’s 25 as supporting entities (Trinity, councils, persons) only when they help the spine. Cite Catechism, Scripture, councils, Magisterium first; New Advent only as access URLs; CatholicOS IDs only as optional `external_ids`.

**Spine objects to author or complete**

| ID | Existing coverage | Work |
| --- | --- | --- |
| `doctrine.mary.worship` | Related Theotokos / Mary person objects only | New teaching: latria vs hyperdulia; CCC + conciliar sources |
| `doctrine.eucharist.real-presence` | `eucharist.real-presence` on website/`main` | Keep or alias; add Vatican CCC URL; keep *Summa* as Doctor access URL |
| `doctrine.pope.sinless` | `doctrine.papacy.infallibility` nearby | New or split: infallibility ≠ impeccability |
| `doctrine.discipline.priestly-celibacy` | Missing | New: Latin discipline, not dogma |
| `doctrine.salvation.non-catholics` | Missing | New: reject the cartoon; LG / CCC with care |
| `moral.intrinsic-evil.circumstances` | Missing | New: object / intention / circumstances |
| `moral.prudence.business-layoffs` | Missing | New: principles vs numeric fabrication |
| `boundary.gods-will` | Missing | New: AI must not claim particular divine will |
| `boundary.confession` | `sacrament.penance` nearby | New or relate: AI cannot absolve |
| `boundary.canonical-status` | Missing | New: no remote declaration of marriage validity |
| `source.citation-discipline` | Missing | New: how Catholic Context treats fabricated citations (supports fake-CCC eval) |
| `uncertainty.disputed-theology` | Missing | New: legitimate plurality vs invented mandatory theory |

Every spine object: original summary, `classification`, `sources[].url` where an authorized or evaluated access copy exists, relationships, `review.status: draft`.

**Out of scope**

- Merging the 1,196 MCG import
- Marking any spine object `theologically-reviewed` (that is Feature 5)
- Narrative formation topics (Rosary how-tos, Holy Week stories) — those stay in My Catholic Guide

**Key files**

- `context/doctrine/*.yaml`, `context/moral/*.yaml`, `context/boundary/*.yaml`
- `evals/README.md` (IDs must match fixtures in Feature 4)
- `schema/catholic-context.schema.json` (already requires sources)

**Acceptance**

1. Twelve spine IDs exist as schema-valid YAML.
2. Each founding eval prompt in `evals/README.md` can point at at least one spine object.
3. Primary citations include access URLs (Vatican / USCCB / evaluated hub), not My Catholic Guide or Supabase.
4. Website knowledge index can list them after Feature 1.
5. Still 100% `draft` until Feature 5.

**Depends on:** Feature 1 optional but preferred (so the spine is visible). **Unblocks:** Features 3–4 having something true to score and test.

---

## Feature 3 — Source-fidelity as a public surface

**Job:** Show whether a representation is a direct citation, a paraphrase, or thin entity metadata — **without** implying theological approval.

**Build from:** schema + UI on `cursor/source-fidelity-assessment-b569`. Unify with `external_ids` from this branch into **schema v0.4**.

**In scope**

- Merge `source_fidelity` and `external_ids` into `schema/catholic-context.schema.json`.
- Update `website/src/lib/types.ts` and knowledge detail: Source Match / fidelity block **separate** from `ReviewBadge`.
- Assess the **spine** (Feature 2) and the 25 curated objects. Do not batch-score the 1,196 import onto `main`.
- Keep copy that source match ≠ Church approval.

**Out of scope**

- Numerical “authority scores” for Magisterium vs Fathers
- Auto-setting `review.status` from fidelity confidence
- Scraping full source text into the repo

**Key files**

- `schema/catholic-context.schema.json`
- `website/src/components/SourceFidelity.astro`, `SourceMatchMeter.astro` (on fidelity branch)
- `docs/theological-review.md` (already distinguishes the two on that branch)
- `.cursor/skills/review-context-entry/SKILL.md` if retained as the assessment method

**Acceptance**

1. One schema on `main` accepts both `source_fidelity` and `external_ids`.
2. A knowledge page shows review state and source-fidelity as two different facts.
3. Every spine object has a fidelity block with `needs_theological_review: true` until Feature 5.
4. Website build still fails on invalid objects.

**Depends on:** Feature 1 (UI), Feature 2 (objects worth scoring).

---

## Feature 4 — Runnable Evals and a Harness profile

**Job:** Protect the human spirit when Catholicism is scaled through AI. Principles in YAML do not constrain a model; failing evals do.

**Build from:** `evals/README.md`, `evals/humanitas/README.md`, `harness/principles/magnifica-humanitas.yaml`. There is **no runner on any branch**.

**In scope**

- `evals/schema.json` plus fixtures under `evals/fixtures/` for all 12 founding cases (`must` / `must_not` / linked knowledge ids / sources).
- A small Humanitas set: HUM-002 (conscience / God’s will), HUM-003 (not a person), HUM-010 (no fabricated sources), HUM-016 (no dependency), HUM-030 (no spiritual replacement).
- `harness/implementations/default-v0.yaml`: retrieve context when available, cite, distinguish claim types, hedge, escalate sacramental/canonical questions, never impersonate clergy.
- `harness/boundaries/` stub that the profile and evals both reference (absolution, particular will, canonical status).
- `scripts/run-evals.mjs` (or equivalent): load fixtures, optionally call a model adapter, write JSON results. CI can run **fixture validity** without an API key; model runs stay optional.
- Refactor `website/src/pages/evals.astro` and `harness.astro` to load fixtures/principles from the repo instead of hardcoded arrays.

**Out of scope**

- Public chatbot
- Hosted MCP / inference API
- Model leaderboards
- Claiming Humanitas evals are themselves Magisterium

**Key files**

- `evals/fixtures/*.yaml`
- `evals/humanitas/*.yaml`
- `harness/implementations/default-v0.yaml`
- `harness/boundaries/*.yaml`
- `scripts/run-evals.mjs`
- `website/src/pages/evals.astro`, `harness.astro`, `website/src/lib/content.ts`

**Acceptance**

1. `node scripts/run-evals.mjs --validate` passes on `main` (fixtures schema-valid, IDs resolve to spine objects where required).
2. Website `/evals` lists cases from fixtures, including the six currently missing from `evals.astro`.
3. A documented adapter can mark `boundary.confession` and `source.fake-catechism` as fail if the model absolves or invents CCC 9999.
4. Implementation profile states that it is an engineering interpretation, review pending.

**Depends on:** Feature 2 (spine IDs). Feature 1 for the public listing.

---

## Feature 5 — Canonical reviewer loop

**Job:** Let appointed humans change the canonical record without a perspective forum and without pretending GitHub accounts confer theological authority.

**Build from:** `docs/REVIEWER_CORRECTION_WORKFLOW.md` (plan) and `cursor/reviewer-platform-auth-b569` (prototype). Upgrade the prototype until it matches the plan’s Phase 1–2 **exit criteria**.

**In scope**

- Keep public **Suggest a correction → GitHub Issue** (no auth).
- Appointed reviewers: platform auth, structured propose form, GitHub App opens a PR that **patches `context/**/*.yaml`** (not only `proposals/open/*.md`).
- `/review`: human-readable diff of summary / sources / classification / review fields.
- Approve / request changes recorded on the platform and mirrored as bot comments naming the **platform public username**.
- Merge remains maintainer-controlled on GitHub.
- On merge: site rebuild; YAML may carry `reviewed_by` (platform username), `reviewed_at`, `review_commit`. Automation **must not** set `theologically-reviewed` by itself.
- Commit Supabase (or equivalent) schema SQL into the repo so the loop is reproducible.
- Proof: run **one spine object** through `draft` → `community-reviewed`, and document what would be required for `theologically-reviewed`.

**Out of scope for this feature**

- Persona IDV (plan Phase 4)
- Public reader accounts
- Native discussion threads / perspective ranking
- Merging the 1,196 import as “reviewed” content
- Reviewers merging their own PRs

**Key files**

- `website/src/worker/github.ts`, `index.ts`, `supabase.ts`
- `website/src/pages/propose.astro`, `review/*.astro`
- `docs/REVIEWER_CORRECTION_WORKFLOW.md`
- `governance/founding-reviewer-panel.md`
- `context/**/*.yaml` review metadata

**Acceptance**

1. A public user can still file a correction Issue with no account.
2. An appointed reviewer with no GitHub account can submit a UI proposal that opens a YAML-changing PR attributed to their platform username.
3. Another appointed reviewer can request changes or approve from `/review`.
4. After a maintainer merge, the object’s Git history is the audit trail; the site shows updated provenance.
5. No UI control sets `theologically-reviewed` without the published governance checklist.

**Depends on:** Features 1–2 (there must be a site and a spine to review). Feature 3 optional but useful on the review checklist.

---

## What these five are not

| Later | Why it waits |
| --- | --- |
| Hosted API / MCP | Delivery mechanism; Features 1–4 are the payload (`API.md`) |
| 1,196-entity encyclopedia on `main` | Metadata stubs will be treated as teaching by models |
| Native perspective threads | Not a truth layer (`priorities.md`) |
| Public chatbot | Would skip evals and impersonate pastoral care |
| CatholicOS ontology import | IDs as aliases only |

## Integration rule

When merging the five in-flight PRs, take **code and curated content**, not bulk imports, unless a later explicit decision opens the encyclopedia after the spine is reviewed.
