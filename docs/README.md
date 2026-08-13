# Catholic Context Documentation

This directory contains the product, architecture, theological-governance, design, commercial-model, and implementation documentation for Catholic Context.

## Start here

For coding agents and developers, begin with the root [`CURSOR.md`](../CURSOR.md).

Recommended reading order:

1. [`../README.md`](../README.md) — project mission and three-layer model
2. [`architecture.md`](architecture.md) — system architecture and open/commercial separation
3. [`COMMERCIAL_MODEL.md`](COMMERCIAL_MODEL.md) — canonical open-source vs managed-commercial boundary
4. [`related-projects.md`](related-projects.md) — how Catholic Context differs from New Advent and CatholicOS
5. [`API.md`](API.md) — API contract thinking; no hosted API in v0.1
6. [`priorities.md`](priorities.md) — community decision and the next five mission-ordered works
7. [`feature-plan.md`](feature-plan.md) — engineering plan for the next five major features
8. [`DESIGN_FIDELITY.md`](DESIGN_FIDELITY.md) — locked high-fidelity My Catholic Guide-derived visual tokens and precedence
9. [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — CatholicContext.org UX/design principles and page guidance
10. [`WEBSITE_IMPLEMENTATION.md`](WEBSITE_IMPLEMENTATION.md) — website implementation and MVP acceptance criteria
11. [`../GOVERNANCE.md`](../GOVERNANCE.md) — founding governance principles
12. [`theological-review.md`](theological-review.md) — theological review workflow
12a. [`REVIEW_CHECKLIST.md`](REVIEW_CHECKLIST.md) — evidence required to change `review.status`
13. [`authority-model.md`](authority-model.md) — source/authority modeling approach
14. [`SOURCE_RIGHTS.md`](SOURCE_RIGHTS.md) — third-party source rights and ingestion limits
15. [`../sources/README.md`](../sources/README.md) — source registry and candidate-source evaluations
16. [`../harness/README.md`](../harness/README.md) — Catholic Harness foundation
17. [`../evals/README.md`](../evals/README.md) — Catholic Evals foundation
18. [`../schema/catholic-context.schema.json`](../schema/catholic-context.schema.json) — canonical knowledge-object schema
19. [`../LICENSING.md`](../LICENSING.md) — licensing model and third-party content boundary

## Documentation roles

### Product, architecture, and business model

- `architecture.md`
- `COMMERCIAL_MODEL.md`
- `related-projects.md`
- `API.md`
- `priorities.md`
- `feature-plan.md`
- `WEBSITE_IMPLEMENTATION.md`

### Design

- `DESIGN_FIDELITY.md` — locked token/fidelity source; wins over older approximations
- `DESIGN_SYSTEM.md` — full UX and experience guidance

### Theological integrity

- `theological-review.md`
- `authority-model.md`
- `SOURCE_RIGHTS.md`
- root `GOVERNANCE.md`
- [`../sources/README.md`](../sources/README.md)
- [`../sources/evaluations/new-advent.md`](../sources/evaluations/new-advent.md)
- [`../sources/evaluations/catholicos.md`](../sources/evaluations/catholicos.md)

### Open-source implementation

- root `CURSOR.md`
- root `CONTRIBUTING.md`
- root `LICENSING.md`
- `schema/`
- `harness/`
- `evals/`

## Design source of truth

My Catholic Guide is the canonical visual family reference for CatholicContext.org.

When the My Catholic Guide source repository is available locally, use its production source first. The locked fallback is `DESIGN_FIDELITY.md`, derived from the validated high-fidelity prototype and real My Catholic Guide production tokens.

Design precedence:

1. My Catholic Guide production source (`brennandecker/mycatholicguide`, especially `docs/` and `apps/web/app/`)
2. `DESIGN_FIDELITY.md`
3. `DESIGN_SYSTEM.md`
4. `WEBSITE_IMPLEMENTATION.md`

## Commercial model source of truth

`COMMERCIAL_MODEL.md` defines what belongs in the open Catholic Context commons versus what may live in separate commercial managed infrastructure.

The governing principle is:

> **Catholic teaching is not the product. Convenience, infrastructure, compute, hosting, and applications are the products.**
