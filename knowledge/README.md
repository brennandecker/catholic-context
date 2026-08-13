# Catholic Context Knowledge

The Knowledge layer stores structured, source-grounded Catholic context.

## Design principle

**Entity identity and theological claim classification are separate dimensions.**

Examples:

- The Eucharist can be represented as a `sacrament` entity.
- A proposition concerning the Real Presence can be represented as a `teaching` entity whose claim classification is `doctrine`.
- Thomas Aquinas can be represented as a `person` entity with relationships to relevant works, teachings, and historical context.

This avoids forcing concepts such as `person`, `sacrament`, `dogma`, and `discipline` into one mutually exclusive field.

## Planned structure

```text
knowledge/
├── teachings/
├── concepts/
├── sacraments/
├── persons/
├── prayers/
├── devotions/
├── liturgy/
├── history/
└── documents/
```

Canonical objects currently live under `context/` (not `knowledge/`) as YAML files validated against `schema/catholic-context.schema.json`. The founding catechetical spine aligns with `evals/fixtures/`. All objects remain `draft` until the review process in `docs/REVIEWER_CORRECTION_WORKFLOW.md` is applied.

Source families, access hubs, and related identifier commons are recorded in `sources/source-registry.yaml`. Candidate sources should be evaluated under `sources/evaluations/` before they become ordinary citation or ingestion targets.
