# Catholic Context

**Open infrastructure for Catholic-grounded AI, search, education, and software.**

Catholic Context is an open-source project for representing Catholic knowledge, Catholic-grounded AI behavior, and measurable theological integrity in a transparent, source-grounded, machine-readable way.

The project is organized around three complementary layers:

- **Knowledge** — What does the Catholic Church teach?
- **Harness** — How should an AI use that knowledge, reason, cite, express uncertainty, and respect Catholic moral and pastoral boundaries?
- **Evals** — Can we demonstrate that the resulting system represents Catholic teaching faithfully and behaves within those boundaries?

Catholic Context does not create Catholic teaching, replace the Magisterium, exercise pastoral or sacramental authority, or claim to discern God's particular will for an individual.

## Architecture

```text
Catholic Context
│
├── knowledge/      Structured Catholic knowledge, sources, and provenance
├── harness/        Model-agnostic behavioral and reasoning framework
├── evals/          Theological, source-fidelity, and boundary evaluations
├── schema/         Machine-readable specifications
├── governance/     Theological integrity and review governance
├── sources/        Source registry, candidate evaluations, and metadata
├── docs/           Architecture and design documentation
└── .github/        Contribution and review workflows
```

## Core principles

1. **Catholic teaching is not determined by popularity.** Community voting can surface problems, usefulness, and review priorities. It does not establish doctrine.
2. **Provenance matters.** Claims should point to identifiable Catholic sources and distinguish source type, claim classification, review status, and uncertainty.
3. **Drafts are drafts.** AI-generated, community-contributed, or otherwise unreviewed material must never be presented as theologically reviewed.
4. **The context layer stays open.** Knowledge, Harness specifications, Evals, schemas, governance standards, and the public website are intended to remain freely accessible and reusable.
5. **Commercial applications and managed services may build on the commons.** Hosting, managed APIs, search, inference, personalization, memory, collaboration, enterprise tooling, and end-user products may be commercial without making Catholic teaching itself proprietary.
6. **AI is a tool, not a spiritual authority.** A Catholic-grounded agent must not claim divine revelation, sacramental authority, certainty about God's will, or replacement of conscience, prayer, clergy, or the teaching office of the Church.
7. **Doctrine and prudential judgment must be distinguished.** The system should clearly distinguish binding teaching, discipline, theological opinion, devotional practice, historical claims, and prudential application.
8. **Governance must remain accountable.** Commercial incentives, repository ownership, contributor popularity, or model output do not determine Catholic teaching.

## Project & commercial model

Catholic Context follows a simple principle:

> **Catholic teaching is not the product. Convenience, infrastructure, compute, hosting, and applications are the products.**

The open project is intended to include the Catholic knowledge layer, Harness, Evals, schemas, governance standards, public website, public API contracts, and open developer tooling.

Optional commercial services may include a managed Catholic Context Cloud offering hosted APIs, managed search, MCP endpoints, inference, uptime, support, and enterprise infrastructure. Developers should remain free to use or self-host the open foundation rather than purchasing the managed service.

[My Catholic Guide](https://mycatholicguide.com/) is a separate commercial end-user application built on Catholic Context.

See [docs/COMMERCIAL_MODEL.md](docs/COMMERCIAL_MODEL.md) for the canonical commercial/open-source boundary.

## Project status

**Pre-alpha / founding stage.** Schemas, authority classification, theological governance, Harness rules, and evaluation criteria are still being established.

No entry or model output should be interpreted as officially approved by the Catholic Church merely because it appears in or uses this repository.

## Knowledge

The Knowledge layer is the epistemic foundation: structured concepts, teachings, people, practices, relationships, citations, and provenance.

A key design rule is that **what an object is** is separate from **the theological classification of claims about it**. For example, the Eucharist may be modeled as a sacrament/concept while a particular proposition about the Eucharist may be classified as doctrine.

## Harness

The Harness is a model-agnostic framework for Catholic-grounded agents. It defines expected behavior around source use, moral reasoning, authority, uncertainty, citations, pastoral boundaries, and escalation to human guidance.

A foundational Harness rule is:

> Catholic Context assists human beings in understanding Catholic teaching and applying Catholic moral principles. It does not possess spiritual authority, administer sacraments, replace conscience, or claim knowledge of God's particular will for an individual.

## Evals

Catholic Evals are public tests that make quality inspectable rather than dependent on a hidden system prompt. They should test doctrine, moral reasoning, source fidelity, uncertainty, hallucination resistance, and pastoral boundaries.

## Review states

- `draft` — created but not yet substantively reviewed
- `community-reviewed` — reviewed through the open contribution process
- `theologically-reviewed` — reviewed by an approved theological reviewer under the project's governance process

Catholic Context deliberately avoids labels such as `Church-approved` or `official` unless an actual ecclesiastical process would justify such a claim.

## Governance

The project is designed so that theological integrity can be governed independently of commercial product decisions. See [GOVERNANCE.md](GOVERNANCE.md) and the documents under `governance/` and `docs/`.

## Licensing

See [LICENSING.md](LICENSING.md). Original Catholic Context software/tooling and original knowledge content are treated separately from third-party source material. Catholic Context does not claim ownership of external Church documents, Scripture translations, liturgical texts, or other third-party works.

## Reference implementation

[My Catholic Guide](https://mycatholicguide.com/) is intended to be an early commercial reference implementation of Catholic Context. The open project is designed so other developers, parishes, ministries, researchers, and AI systems can build on the same public foundation.

## Contributing

Corrections, better citations, additional context, translations, evaluation cases, Harness improvements, schemas, tooling, and documentation are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).
