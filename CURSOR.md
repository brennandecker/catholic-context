# Catholic Context — Cursor Instructions

This file is the implementation entrypoint for coding agents working in this repository.

## Mission

Build Catholic Context as open infrastructure for Catholic knowledge and Catholic-grounded AI while preserving theological provenance, transparent governance, and a clean separation from commercial applications such as My Catholic Guide.

## Read these files first

Before making architectural or UI changes, read in this order:

1. `README.md`
2. `CURSOR.md`
3. `docs/architecture.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/WEBSITE_IMPLEMENTATION.md`
6. `GOVERNANCE.md`
7. `docs/theological-review.md`
8. `docs/authority-model.md`
9. `harness/README.md`
10. `evals/README.md`
11. `schema/catholic-context.schema.json`
12. `LICENSING.md`

These documents are the current product and implementation source of truth.

## Project architecture

Catholic Context has three primary open layers:

- **Knowledge** — What does the Catholic Church teach?
- **Harness** — How should Catholic-grounded AI reason and behave?
- **Evals** — Does the AI faithfully represent Catholic teaching and respect its boundaries?

Git is the canonical versioned record during the initial project stage.

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

## Design constraint

**MyCatholicGuide.com is the canonical visual reference implementation.**

CatholicContext.org must feel like the scholarly/open-source sibling of My Catholic Guide.

If the My Catholic Guide source repository is available in the local workspace, inspect and reuse/adapt its actual design tokens and component patterns before inventing replacements.

Do not clone its page layouts. Reuse the visual language for a denser knowledge/research product.

Read `docs/DESIGN_SYSTEM.md` before implementing UI.

## Website constraint

The website is an interface to the open project, not a second canonical database.

Do not move theological truth into hard-coded React components or a proprietary CMS.

Canonical content should remain traceable to repository content and schemas.

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

## v0.1 non-goals

Do not add these unless explicitly requested:

- authentication
- proprietary voting backend
- vector database
- embeddings
- AI chat
- subscriptions
- managed API
- MCP server
- parish administration
- complex CMS
- model leaderboards

## Contribution workflow

Prefer small, reviewable changes. Do not bulk-generate large amounts of theological content simply to populate the site.

New theological content should default to `draft` unless the governance process establishes otherwise.

Substantive changes to previously reviewed theological content should trigger re-review according to governance documentation.

## Definition of done for website work

A change is not complete merely because it renders.

Check:

- design-system consistency
- mobile behavior
- accessibility
- source provenance
- review-state accuracy
- canonical GitHub traceability
- schema validity
- no unsupported ecclesiastical claims
- no invented product capabilities
- reasonable performance

## Foundational boundary

> Catholic Context assists human beings in understanding Catholic teaching and applying Catholic moral principles. It does not possess spiritual authority, administer sacraments, replace conscience, or claim knowledge of God's particular will for an individual.
