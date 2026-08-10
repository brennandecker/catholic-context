# Catholic Context

**An open, structured, source-grounded knowledge layer for Catholic teaching — built for humans and AI.**

Catholic Context exists to make the teachings, sources, terminology, and relationships of the Catholic Church easier to retrieve, cite, understand, and build upon.

## Core principles

1. **Catholic teaching is not determined by popularity.** Community voting may help surface useful content and prioritize review, but it does not establish doctrine.
2. **Provenance matters.** Claims should point to identifiable Catholic sources and distinguish source types and authority.
3. **Drafts are drafts.** AI-generated, community-contributed, or otherwise unreviewed material must never be presented as having received theological approval.
4. **The knowledge layer is open.** The project is intended to remain freely accessible and reusable.
5. **Commercial products may build on the project.** The open context layer is distinct from applications, hosting, inference, personalization, or other paid services built around it.
6. **Catholic Context does not create Catholic teaching.** It attempts to faithfully represent what the Catholic Church teaches.

## Project status

**Pre-alpha / founding stage.** The schemas, governance model, authority model, and review process are still being established.

No entry should be interpreted as officially approved by the Catholic Church merely because it appears in this repository.

## Repository structure

```text
context/        Structured Catholic context objects
schema/         Machine-readable schemas
sources/        Source registry and metadata
docs/           Architecture, authority, and theological-review documentation
.github/        Contribution and review workflows
```

## Review states

- `draft` — created but not yet substantively reviewed
- `community-reviewed` — reviewed through the open contribution process
- `theologically-reviewed` — reviewed by an approved theological reviewer under the project's governance process

The project may refine these states as governance matures.

## Contributing

Corrections, better citations, additional context, translations, schema improvements, and technical contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Governance

Catholic Context is designed so that commercial incentives, contributor popularity, or repository ownership do not determine what is represented as Catholic teaching. See [GOVERNANCE.md](GOVERNANCE.md).

## Licensing

See [LICENSING.md](LICENSING.md). Original Catholic Context material and software are licensed separately from third-party source material. Catholic Context does not claim ownership of external Church documents, Scripture translations, or other third-party works.

## First implementation

My Catholic Guide is intended to be an early consumer of Catholic Context. The long-term goal is for any developer, parish, ministry, researcher, or AI system to be able to build on the same open context layer.
