# Catholic Context — Cursor Instructions

This file is the implementation entrypoint for coding agents working in this repository.

## Mission

Build Catholic Context as open infrastructure for Catholic knowledge and Catholic-grounded AI while preserving theological provenance, transparent governance, visual fidelity to My Catholic Guide, and a clean separation from commercial applications and managed services.

## Read these files first

Before making architectural or UI changes, read in this order:

1. `README.md`
2. `CURSOR.md`
3. `docs/architecture.md`
4. `docs/COMMERCIAL_MODEL.md`
5. `docs/DESIGN_FIDELITY.md`
6. `docs/DESIGN_SYSTEM.md`
7. `docs/WEBSITE_IMPLEMENTATION.md`
8. `GOVERNANCE.md`
9. `docs/theological-review.md`
10. `docs/authority-model.md`
11. `harness/README.md`
12. `evals/README.md`
13. `schema/catholic-context.schema.json`
14. `LICENSING.md`

These documents are the current product and implementation source of truth.

## Project architecture

Catholic Context has three primary open layers:

- **Knowledge** — What does the Catholic Church teach?
- **Harness** — How should Catholic-grounded AI reason and behave?
- **Evals** — Does the AI faithfully represent Catholic teaching and respect its boundaries?

Git is the canonical versioned record during the initial project stage.

## Open versus commercial boundary

Catholic Context is the open foundation. The public repository may contain:

- Knowledge
- Harness
- Evals
- schemas
- governance
- documentation
- CatholicContext.org website source
- public API contracts
- open SDK/client code
- self-hosting tooling
- open MCP interfaces/implementation when intentionally created

Commercial managed-service implementation should normally remain outside this repository, including:

- billing
- payment configuration
- production API credentials
- customer records
- usage metering
- proprietary operational tooling
- commercial account management
- production secrets
- private enterprise integrations
- proprietary model-routing infrastructure

Public API specifications may live here even when the managed production API is commercial.

The governing principle is:

> **Catholic teaching is not the product. Convenience, infrastructure, compute, hosting, and applications are the products.**

Read `docs/COMMERCIAL_MODEL.md` before implementing API, cloud, billing, or enterprise functionality.

## Non-negotiable theological/product constraints

1. Do not allow votes, engagement, popularity, model confidence, or commercial incentives to determine doctrinal status.
2. Never silently upgrade review status.
3. Never label content `verified`, `official`, `Church-approved`, or `Vatican-approved` unless governance and actual ecclesiastical authority explicitly justify it.
4. Keep entity identity separate from theological claim classification.
5. Preserve source provenance.
6. Do not invent source citations.
7. Do not reproduce third-party copyrighted Catholic source texts unnecessarily.
8. Do not make an AI agent claim divine revelation, sacramental authority, ecclesiastical office, or certainty about God's particular will for a person.
9. Do not present an AI as a substitute for conscience, prayer, the Sacraments, clergy, qualified pastoral care, or the Magisterium.
10. Distinguish doctrine, dogma, moral teaching, discipline, theological opinion, devotional practice, historical claims, and prudential judgment.
11. If the data cannot support a theological claim or classification, represent uncertainty rather than inventing certainty.
12. Commercial customers, donors, sponsors, or users may not purchase theological outcomes or canonical status.

## Source-fidelity assessment

Knowledge objects may include a `source_fidelity` block that records whether an entry is a direct citation, paraphrase, summary, synthesis, or entity metadata; a 0–1 confidence score for source match; whether sources are linkable; and whether theological review is needed.

This assessment may be produced by the project skill `.cursor/skills/review-context-entry/SKILL.md`.

Hard rules:

- source-fidelity confidence grades our restatement of cited Church sources; it does not put Catholic teaching itself on trial
- agents/skills must **never** set `review.status: theologically-reviewed`
- synthesis, weak linkage, or interpretive surplus should set `needs_theological_review: true`

Read `docs/theological-review.md` before changing review or source-fidelity behavior.

## Design constraint

**My Catholic Guide is the canonical visual reference implementation.**

CatholicContext.org must feel like the scholarly/open-source sibling of My Catholic Guide.

### Design source-of-truth precedence

Use this order:

1. My Catholic Guide production source when available locally (`brennandecker/mycatholicguide`, especially `docs/` and `apps/web/app/`).
2. `docs/DESIGN_FIDELITY.md`.
3. `docs/DESIGN_SYSTEM.md`.
4. `docs/WEBSITE_IMPLEMENTATION.md`.
5. Local design judgment where all sources are silent.

Do not use older approximate design values where they conflict with the locked fidelity reference.

Locked design characteristics include warm paper/ink/missal-red tokens, square/zero-radius controls, warm shadows, paper-grain texture, and the Cormorant Garamond / EB Garamond / IM Fell English SC / Caveat type system.

Do not clone My Catholic Guide page layouts. Reuse the visual language for a denser knowledge/research product.

## Website constraint

The website is an interface to the open project, not a second canonical database.

Do not move theological truth into hard-coded React components or a proprietary CMS.

Canonical content should remain traceable to repository content and schemas.

The public may inspect, fork, open issues, and submit pull requests. Public contribution does not imply direct edit or merge access to canonical content.

## Engineering principles

- prefer simple architecture over premature platform complexity
- prefer static/server rendering for stable content
- validate canonical structured content during build/development
- use typed internal representations
- minimize client JavaScript
- build accessible interfaces
- fail visibly on malformed canonical data rather than silently discarding it
- do not add infrastructure before a concrete use case requires it
- keep future API/MCP/SDK concerns separable from the website
- keep managed commercial infrastructure separable from the open foundation

## v0.1 non-goals

Do not add these unless explicitly requested:

- authentication
- proprietary voting backend
- vector database
- embeddings
- AI chat
- subscriptions
- managed commercial API implementation
- production billing/metering
- MCP hosting service
- parish administration
- complex CMS
- model leaderboards

Public API contracts or interfaces may be designed without implementing commercial cloud operations.

## Contribution workflow

Prefer small, reviewable changes. Do not bulk-generate large amounts of theological content simply to populate the site.

New theological content should default to `draft` unless the governance process establishes otherwise.

Substantive changes to previously reviewed theological content should trigger re-review according to governance documentation.

Contributors may propose changes; approved maintainers control canonical merges. Theological changes may additionally require qualified theological review.

## Definition of done for website work

A change is not complete merely because it renders.

Check:

- locked design fidelity
- My Catholic Guide family resemblance
- mobile behavior
- accessibility
- source provenance
- review-state accuracy
- canonical GitHub traceability
- schema validity
- no unsupported ecclesiastical claims
- no invented product capabilities
- open/commercial boundary compliance
- reasonable performance

## Foundational boundary

> Catholic Context assists human beings in understanding Catholic teaching and applying Catholic moral principles. It does not possess spiritual authority, administer sacraments, replace conscience, or claim knowledge of God's particular will for an individual.
