# Source evaluation: CatholicOS / Catholic Digital Commons Foundation

- **Candidate:** [CatholicOS GitHub organization](https://github.com/orgs/CatholicOS)
- **Related public face:** [Catholic Digital Commons Foundation](https://catholicdigitalcommons.org)
- **Org created:** 2025-10-10
- **Evaluated as:** related open Catholic digital infrastructure — identifier registries, ontologies, and APIs — not a theological source
- **Registry status:** `related-infrastructure`
- **Evaluation status:** draft / project-use judgment; theological review pending
- **Rights determination date:** 2026-08-13

## Summary

CatholicOS is a collaborative GitHub organization for Catholic technologists, stewarded in connection with the Catholic Digital Commons Foundation (CDCF). It is one of the closest peer projects to Catholic Context on the **identifier, ontology, and liturgical-data** side of Catholic digital infrastructure.

It is **not** a source of Catholic teaching. Its canonical-ID repositories, OWL models, and APIs are engineering interpretations of public Catholic realities. They can reduce duplicate identifiers and improve interoperability. They must not be imported as an authority ranking, a substitute Magisterium, or a shortcut around Catholic Context's own source-provenance and theological-review rules.

The highest-value relationship is **crosswalk, not ingestion**: optional external identifiers for councils, pontiffs, Doctors, Churches *sui iuris*, magisterial documents, and liturgical calendar data, while Catholic Context continues to cite Scripture, councils, the Catechism, the Magisterium, and canon law as teaching sources.

## What CatholicOS is

As of this evaluation the public organization had about 40 repositories. They fall into four groups.

### A. Canonical identifier / data repositories (highest relevance)

These are original CDCF compilations of stable IDs for well-known Catholic entities. Several explicitly mark IDs as drafts pending committee review and author original summaries rather than copying a third-party table.

| Repository | Scope | Example ID pattern |
| --- | --- | --- |
| [coecdr](https://github.com/CatholicOS/coecdr) | 21 ecumenical councils recognized by the Catholic Church | `oec:nicaea-i`, `oec:vatican-ii` |
| [crpdr](https://github.com/CatholicOS/crpdr) | Roman Pontiffs, seeded from the Holy See's pontiff table | `rp:leo-xiv`, `rp:john-paul-ii` |
| [cdoctdr](https://github.com/CatholicOS/cdoctdr) | 38 Doctors of the Church | `doct:thomas-de-aquino` |
| [cesidr](https://github.com/CatholicOS/cesidr) | 24 Churches *sui iuris* | (canonical IDs for particular churches) |
| [cmddr](https://github.com/CatholicOS/cmddr) | Magisterial / papal document identifiers and document-type distinctions | in progress |
| [clbdr](https://github.com/CatholicOS/clbdr) | Liturgical books and editions of the Roman Rite | in progress |
| [cledr](https://github.com/CatholicOS/cledr) | Common liturgical events | in progress |
| [crmedr](https://github.com/CatholicOS/crmedr) | Roman Martyrology eulogy identifiers | `mr:` |
| [cecdr](https://github.com/CatholicOS/cecdr) | Ecclesiastical circumscriptions | in progress |
| [ciclsaldr](https://github.com/CatholicOS/ciclsaldr) | Institutes of consecrated life / societies of apostolic life | in progress |

Several of these repositories are Apache-2.0. That license covers the **compilation, identifiers, and original prose**, not the underlying liturgical or magisterial texts.

### B. Ontologies and semantic tooling (high relevance, high caution)

| Repository | Role |
| --- | --- |
| [ontology-semantic-canon](https://github.com/CatholicOS/ontology-semantic-canon) | OWL/RDF model of Scripture, Tradition, Magisterium, hierarchy, sacraments, and related classes; 120,000+ triples; WebProtégé as editorial source of truth |
| [ontologies-project](https://github.com/CatholicOS/ontologies-project) | Umbrella for CDCF ontology work |
| [ontology-liturgical-calendar](https://github.com/CatholicOS/ontology-liturgical-calendar) | Semantic description of liturgical-calendar elements |
| [ontokit-api](https://github.com/CatholicOS/ontokit-api) / [ontokit-web](https://github.com/CatholicOS/ontokit-web) | Collaborative OWL curation platform |

The semantic-canon README describes a machine-readable model of the deposit of faith, including authority, chronology, and theological weight. The ontologies-project example language goes further and contemplates using source "weights" to prioritize authority in LLM training data.

That is adjacent to Catholic Context's problem, but it is **not compatible with a naive merge**. Catholic Context's authority model is deliberately provisional and records source type separately from theological weight precisely to avoid inventing a simplistic ranking without qualified review. CDCF ontology predicates and weights are engineering artifacts. They may be compared; they must not silently become Catholic Context `classification.claim_type` or `classification.certainty`.

### C. APIs and rights-aware data services (high practical value)

| Repository | Role |
| --- | --- |
| [liturgical-calendar-api](https://github.com/CatholicOS/liturgical-calendar-api) | Roman Catholic liturgical calendar API (Apache-2.0) |
| [liturgical-calendar-mcp](https://github.com/CatholicOS/liturgical-calendar-mcp) | MCP server over that calendar API |
| [bibleget-api](https://github.com/CatholicOS/bibleget-api) | BibleGet I/O API endpoints |
| [martyrology-api](https://github.com/CatholicOS/martyrology-api) | Martyrology API whose public code is separated from copyrighted eulogy texts kept private |

The martyrology API is especially aligned with `docs/SOURCE_RIGHTS.md`: public identifiers and code, private or edition-gated copyrighted texts, honest 404s when a restricted edition is not attached. That pattern is a model for any future Catholic Context access layer.

Liturgical calendar computation is operational data, not doctrine. It can support `liturgy` entities and applications without being treated as Magisterium.

### D. Applications, hackathons, and foundation housekeeping (out of scope as sources)

Examples: `awesome-catholic`, `allsaints-hackathon-2025`, `caritas-ai`, `homilia-ai`, `justicelens`, `printpraypeel.com`, `outwardsign`, foundation bylaws/logo/manifesto, and infra.

These may be useful as an ecosystem map or as fellow Catholic software projects. They are not context sources for knowledge objects.

`awesome-catholic` is a curated list of Catholic technology projects. It is discovery metadata, not a theological corpus.

## Authority posture

CatholicOS / CDCF materials should be classified as **project infrastructure**, analogous to Catholic Context's own schemas and Harness: useful, inspectable, and non-magisterial.

In particular:

- A CDCF identifier for Nicaea I does not replace citing the council's canons or definitions.
- A CMDDR draft table that maps document types to "extraordinary / ordinary" and "infallible / —" is a **simplified engineering sketch**. Catholic Context must not copy it into the authority model as if it were settled theology. The CMDDR README itself marks that table as an initial draft needing revision.
- Council recognition fields in COECDR are more careful: they record formal reception by communions rather than a binary "ecumenical" flag, and they keep Protestant esteem in prose. That caution is worth learning from, not rubber-stamping.
- Original CDCF summaries of councils, Doctors, or popes are third-party original content under their own license. They may be linked or compared. They should not be copied in as Catholic Context summaries.

## Rights

Do not assume a uniform license across the organization. Observed statuses at evaluation time:

- **Apache-2.0** on many identifier, ontology, calendar, and API repositories. Compatible in principle with Catholic Context software licensing, subject to attribution and the usual third-party-text caveats.
- **MIT** on some tooling (`ontokit-api`, `cardinals`, `CatholicTech`).
- **Unlicensed / unspecified** on a substantial number of repositories, including `awesome-catholic` and several application repos. Treat those as `unknown` until a license is present.
- **Copyrighted liturgical and magisterial texts** remain third-party even when CatholicOS publishes identifiers for them. The martyrology API states this explicitly.

CatholicOS original identifiers and original prose are not Church documents. Citing or crosswalking an ID is not a grant to reproduce a missal, martyrology edition, or Vatican translation.

## Recommended use

**Do use CatholicOS as related infrastructure:**

1. Optional `external_ids` / crosswalks on Catholic Context person, event, institution, and document objects (pontiff, council, Doctor, Church *sui iuris*, liturgical book).
2. Comparison set for identifier grammar and registry design.
3. Liturgical calendar API as a possible runtime dependency for applications, not as a teaching source.
4. Martyrology-style rights separation as a pattern for any future text-access APIs.
5. Ecosystem awareness via `awesome-catholic` and CDCF foundation docs.

**Do not:**

1. Treat CatholicOS, CDCF, WebProtégé, or an OWL class as a Catholic source type.
2. Import ontology "authority weights" into knowledge-object classification.
3. Ingest CDCF summaries as if they were reviewed Catholic Context knowledge.
4. Ground doctrine, discipline, or moral teaching in hackathon apps, news aggregators, or volunteer-matching tools.
5. Assume draft IDs are stable. Several registries say all IDs are drafts pending committee review.

## Ingestion posture

- **Identifiers:** permitted to record as optional external IDs, with source-registry provenance and a note that they are draft CDCF identifiers.
- **Ontology files:** do not vendor the 120k-triple graph into Catholic Context as canonical theology. A documented comparison or mapping discussion may live under `docs/` or `sources/evaluations/`.
- **API responses:** applications may call calendar or identifier APIs; the open knowledge layer should still cite Church sources.
- **Copyrighted liturgical/scriptural/magisterial text** reached through CatholicOS services: follow `docs/SOURCE_RIGHTS.md` exactly as if the text came from any other host.

## Risks

1. **Category error.** The org is easy to misread as "another Catholic knowledge base." It is mostly identifiers and ontologies.
2. **Authority compression.** Document-type-to-infallibility tables and LLM source-weight language conflict with Catholic Context's refusal to invent a simplistic ranking.
3. **Instability.** The organization is young (2025). Draft IDs, empty-ish application repos, and missing licenses are common.
4. **Dual namespaces.** CDCF already uses Latin lemmas in some registries and English slugs in others, bridged by cross-references. Catholic Context should not create a third incompatible scheme without a crosswalk plan.
5. **WebProtégé as source of truth** for the semantic canon means GitHub copies may lag. Do not treat a cloned OWL file as the live model without checking.
6. **Peer, not dependency.** Aligning too tightly with an external commons could make Catholic Context's canonical record unreproducible if that commons moved, re-licensed, or changed IDs.

## Relationship to Catholic Context

The two projects are complementary:

| Catholic Context | CatholicOS / CDCF |
| --- | --- |
| What does the Church teach, with provenance and review? | What stable IDs and semantic types name Catholic realities? |
| Knowledge objects, Harness, Evals | Registries, OWL models, calendar/martyrology APIs |
| Source type recorded separately from claim classification | Some models attempt hierarchical authority / weight |
| Git as canonical theological record | Git + WebProtégé + private text stores |

A healthy relationship is the same one Catholic Context already claims toward the Magisterium and toward commercial apps: **cite and interoperate without absorbing the other party's authority claims.**

If Catholic Context later adds optional external-ID fields, prefer these CDCF families first:

- `oec:` councils
- `rp:` Roman Pontiffs
- `doct:` Doctors of the Church
- CMDDR document IDs, once that registry is less drafty
- liturgical book / calendar IDs where liturgy objects need them

Do not wait for that schema change before recording the relationship in the source registry.

## Conclusion

**Accept CatholicOS / CDCF as related open infrastructure. Do not accept it as a Catholic teaching source.**

Priority order for later engineering work:

1. Identifier crosswalks for councils, pontiffs, and Doctors
2. Watch CMDDR for magisterial-document identifiers
3. Treat liturgical-calendar and martyrology APIs as optional application infrastructure with explicit rights boundaries
4. Compare, but do not import, the semantic-canon authority model
5. Ignore hackathon and ministry apps as knowledge sources
