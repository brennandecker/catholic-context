# Catholic Context Knowledge

The Knowledge layer stores structured, source-grounded Catholic context.

## Design principle

**Entity identity and theological claim classification are separate dimensions.**

Examples:

- The Eucharist can be represented as a `sacrament` entity.
- A proposition concerning the Real Presence can be represented as a `teaching` entity whose claim classification is `doctrine`.
- Thomas Aquinas can be represented as a `person` entity with relationships to relevant works, teachings, and historical context.

This avoids forcing concepts such as `person`, `sacrament`, `dogma`, and `discipline` into one mutually exclusive field.

## Canonical files

Machine-readable knowledge objects currently live under [`context/`](../context/) and are validated against [`schema/catholic-context.schema.json`](../schema/catholic-context.schema.json).

```text
context/
├── doctrine/       Claim-level teachings (draft unless reviewed)
├── sacraments/     Sacrament entities and related teachings
├── liturgy/        Liturgical realities (e.g., the Mass)
├── persons/        People (saints, popes, biblical figures)
├── events/         Councils and historical events
└── places/         Churches and institutional places
```

Catholic Context prefers catechetical / juridical / entity records over narrative formation guides. Narrative “how-to” and seasonal storytelling content belongs in applications such as My Catholic Guide.

All substantive theological knowledge should carry explicit review metadata and source provenance. The format remains pre-alpha: new objects default to `review.status: draft`.
