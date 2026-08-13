# Source evaluations

This directory records evaluations of candidate context sources before they are treated as ordinary citation targets, ingestion candidates, or related infrastructure.

An evaluation is a project judgment about **how Catholic Context should use a source**. It is not a theological ranking of the source, and it does not confer ecclesiastical approval.

## When to evaluate

Evaluate a source family when it is proposed as:

- a recurring citation target
- an access hub for primary texts
- a bulk-ingestion candidate
- an identifier, ontology, or data commons that Catholic Context might align with
- a news, commentary, or secondary site that might be mistaken for teaching authority

Do not treat a URL being freely readable, popular, or Catholic-branded as sufficient.

## Evaluation questions

Each evaluation should answer:

1. **Identity.** Is this a primary source, an edition/translation, a compilation, an access hub, identifier commons, ontology, application, or news/commentary?
2. **Source type.** Which Catholic Context source type(s) apply, if any? See `docs/authority-model.md`.
3. **Edition.** What work, translator, publisher, date, and language are actually being used?
4. **Authority posture.** What may this source support (doctrine, history, biography, liturgy, identifiers), and what must it not determine?
5. **Rights.** What is the documented rights status of the underlying work, the translation, and the host presentation? Follow `docs/SOURCE_RIGHTS.md`.
6. **Recommended use.** Cite, link, crosswalk identifiers, compare models, or do not use for grounding teaching?
7. **Ingestion posture.** Metadata and citations only, documented public-domain text, or never?
8. **Risks.** Outdated scholarship, spurious works, editorial overlay, oversimplified authority tables, copyrighted translations, or news mistaken for Magisterium.
9. **Relationship.** How does this relate to families already in `sources/source-registry.yaml`?

## Status values

Evaluations and registry records may use:

- `candidate` — identified, not yet accepted for ordinary use
- `accepted-for-citation` — may be cited with the recorded caveats
- `related-infrastructure` — useful for identifiers, APIs, or ontologies; not a teaching source
- `do-not-ground-doctrine` — may be linked or described, but must not ground Catholic Context teaching claims
- `rejected` — should not be used

These statuses are project-use classifications. They are not theological grades.

## Current evaluations

- [`new-advent.md`](new-advent.md) — New Advent as an access hub and the collections it hosts
- [`catholicos.md`](catholicos.md) — CatholicOS / Catholic Digital Commons Foundation identifier and ontology commons

How Catholic Context differs from those projects, what "consume" means, and when an API is appropriate: [`docs/related-projects.md`](../../docs/related-projects.md) and [`docs/API.md`](../../docs/API.md).
