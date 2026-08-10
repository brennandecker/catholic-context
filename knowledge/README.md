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

All substantive theological knowledge should carry explicit review metadata and source provenance. The current machine-readable schema lives under `schema/` while the format remains pre-alpha.
