# Related projects: New Advent and CatholicOS

## Status

**Draft product positioning.** This is a project-use judgment about how Catholic Context relates to two neighboring Catholic digital projects. It is not ecclesiastical approval of either project, and it does not rank their theological value.

Companion evaluations:

- [`../sources/evaluations/new-advent.md`](../sources/evaluations/new-advent.md)
- [`../sources/evaluations/catholicos.md`](../sources/evaluations/catholicos.md)

## How Catholic Context is different

The three projects solve different problems. They overlap in subject matter, not in function.

```text
New Advent          CatholicOS / CDCF         Catholic Context
────────────        ─────────────────         ────────────────
Host the texts      Name the realities        Represent the teaching
Encyclopedia,       Canonical IDs,            Knowledge objects
Fathers, Summa,     ontologies,               + provenance + review
Bible, documents,   liturgical/martyrology    Harness (how AI should behave)
news                APIs                      Evals (can we measure fidelity?)
```

| | New Advent | CatholicOS / CDCF | Catholic Context |
| --- | --- | --- | --- |
| **Primary job** | Give humans readable access to a large Catholic library | Give software stable identifiers, ontologies, and operational Catholic data | Give humans and machines a source-grounded, reviewable representation of Catholic teaching and of how AI may use it |
| **Canonical artifact** | HTML pages and a paid site download | Git registries, OWL models, calendar/martyrology APIs | Git knowledge objects, Harness, Evals, schemas, governance |
| **What it is not** | Not Magisterium; not a reviewed knowledge graph; not an AI behavioral spec | Not a teaching corpus; not a substitute authority ranking | Not a digital library of source full text; not a liturgical calendar service; not the Magisterium |
| **Product** | The hosted compilation | Shared digital infrastructure for Catholic software | Open context layer; commercial products may sell convenience around it |
| **Authority handling** | Mixes Fathers, 1913 scholarship, encyclicals, and news in one site | Some models attempt source weights / document-type-to-infallibility tables | Records source type separately from claim classification; review status is explicit; rankings stay provisional |
| **Rights posture** | Site compilation copyrighted; some hosted works are public domain, some are not | Identifiers often Apache-2.0; underlying liturgical and magisterial texts remain third-party | Cite, summarize originally, and link; do not ingest third-party full text without documented rights |

Catholic Context exists because a library of texts and a registry of IDs are not enough for Catholic-grounded AI.

A model can retrieve Augustine from New Advent and still invent a citation, collapse dogma into discipline, or speak as if it had pastoral authority. A model can know that Nicaea is `oec:nicaea-i` and still misstate what Nicaea defined. Catholic Context's three layers are the missing middle:

1. **Knowledge** — what claim is being made, from which sources, with what review
2. **Harness** — how an AI must cite, hedge, and refuse spiritual impersonation
3. **Evals** — whether that behavior is actually happening

New Advent is upstream **source access**. CatholicOS is adjacent **identity infrastructure**. Catholic Context is the **interpreted, governed context layer** between those and applications such as My Catholic Guide.

## Should Catholic Context consume their content?

Yes, but not as a scrape and not as a second Magisterium. Consume means different things for each project.

### New Advent — cite and link; do not ingest the site

| Consume? | What | Why |
| --- | --- | --- |
| **Yes** | Access URLs on knowledge-object source entries | Readers and reviewers can open the edition being cited |
| **Yes** | Discovery of public-domain Fathers, *Summa* questions, and 1913 encyclopedia articles | Speeds sourcing; the work cited is still Aquinas, Augustine, or the encyclopedia, not New Advent |
| **No** | Wholesale HTML, the paid download, Knox Bible text, news, or site chrome | `docs/SOURCE_RIGHTS.md`; New Advent LLC copyrights the compilation; Knox is third-party copyrighted |
| **No** | Treating a 1913 encyclopedia article as current Church teaching | Historical scholarship, not the Catechism or Magisterium |
| **Not yet, and maybe never from this host** | Bulk public-domain full text | If the project ever stores a PD edition, determine rights on that edition (print text, translator, transcription), preferably from a documented public-domain source, not by copying New Advent's website |

A source entry should look like this, not like a dump of the page:

```yaml
sources:
  - source_type: doctor-of-the-church
    reference: ST III q.75 a.1
    url: https://www.newadvent.org/summa/4075.htm
    note: Dominican Fathers 1920 translation. New Advent is the access hub, not the author.
```

### CatholicOS — crosswalk identifiers; do not import theology

| Consume? | What | Why |
| --- | --- | --- |
| **Yes** | Optional external IDs (`oec:`, `rp:`, `doct:`, later CMDDR / liturgical book IDs) | Avoid a parallel incompatible namespace for the same councils, popes, and Doctors |
| **Yes, in applications** | Liturgical calendar API as a runtime dependency | Operational calendar data; not a teaching source |
| **Yes, as a pattern** | Martyrology API's split between public code and private copyrighted text | Same rights philosophy as Catholic Context |
| **Compare only** | Semantic-canon OWL graph and authority-weight language | Useful interoperability research; must not become `classification.certainty` |
| **No** | CDCF original summaries copied in as Catholic Context knowledge | Those summaries are their content, still unreviewed here, and not Church documents |
| **No** | Hackathon apps, news aggregators, or ministry tools as sources | Out of scope |

Catholic Context should remain useful if CatholicOS IDs change or the org goes quiet. External IDs are aliases, not the canonical `id` of a knowledge object.

## What to do next

Do not start by building a hosted API. There is not yet enough canonical knowledge for an API to be more than an empty wrapper, and both neighbors already occupy adjacent API niches (New Advent as a human library; CatholicOS as calendar/identifier services).

Recommended sequence:

1. **Keep Git as the canonical record.** The website, any future API, and any index must be generated from repository objects.
2. **Make the consume rules real in the schema.** Optional `external_ids` for CDCF crosswalks; source `url` used as an access link with edition notes. Do not add a full-text field.
3. **Write a small number of high-quality knowledge objects** that demonstrate the difference: a teaching with Catechism plus *Summa* access URLs; a person with a `doct:` alias; a council with an `oec:` alias. Default `review.status: draft`.
4. **Ship the public website** as the first consumer of those objects, with provenance and review state visible. That is the v0.1 interface.
5. **Then publish an API contract** that returns the same objects the website already renders. See [`API.md`](API.md).
6. **Build a hosted API only when a real consumer needs it** (My Catholic Guide, another app, or self-hosting demand). Charge for hosting and convenience, not for the teaching.

Work that looks productive but would blur the differences:

- Mirroring New Advent into the repo
- Vendoring the CatholicOS ontology as our authority model
- Standing up search/inference/MCP hosting before there is reviewed context to serve
- Duplicating the liturgical calendar API

## API timing

Thinking about an API is appropriate. Implementing one now is not.

Catholic Context's commercial model already allows public API **specifications** in this repository and a later managed API as a paid convenience. `CURSOR.md` still lists managed commercial API implementation as a v0.1 non-goal.

The reason to think now is defensive: if we do not say what an API is for, it will tend to become either a New Advent clone (serve the texts) or a CatholicOS clone (serve IDs and calendar data). The Catholic Context API should serve **context objects, Harness rules, and Evals**, with links out to sources.

Details and a contract sketch live in [`API.md`](API.md).
