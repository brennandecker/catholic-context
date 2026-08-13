# Catholic Context API

## Status

**Contract thinking only. No hosted API in v0.1.**

The public repository may contain API specifications. A managed production API is a later commercial convenience. Git remains the canonical record. See `docs/COMMERCIAL_MODEL.md` and the v0.1 non-goals in `CURSOR.md`.

This document exists so that when an API is designed, it is a Catholic Context API rather than a New Advent mirror or a CatholicOS duplicate.

## Why not now

An API is a delivery mechanism. It does not create the thing being delivered.

Today the project has a schema, a source registry, Harness drafts, Eval sketches, and almost no reviewed knowledge objects. A production API would advertise completeness we do not have, force authentication/metering decisions early, and compete with work that actually distinguishes the project: sourced, classified, review-stated context.

The first consumer should be the public website reading repository files at build time. That already proves the data contract. An HTTP API can wait until that contract is boring.

## What a Catholic Context API would be for

When it exists, it should let an application or agent fetch the open foundation:

| Resource | Purpose |
| --- | --- |
| Knowledge objects | Structured teaching/entity records with classification, sources, relationships, and review metadata |
| Source registry | How to cite families, hubs, and related infrastructure |
| Harness principles | Model-agnostic behavioral requirements |
| Evals | Public tests of fidelity and boundaries |
| Schema / OpenAPI | The contract itself |

A response should be able to answer:

- What does Catholic Context currently represent about this?
- What kind of claim is it?
- Which sources support it, and what kind of sources are they?
- Has this representation been theologically reviewed?
- Where can a human read the cited edition?

It should not need to answer:

- Here is the full Catechism, Knox Bible, or New Advent encyclopedia dump
- Here is today's liturgical calendar (use a calendar API)
- Here is the model's private chain-of-thought
- Here is a Church-approved oracle

## What it must not become

| Temptation | Why not | Who already does something like that |
| --- | --- | --- |
| Full-text source server | Rights, and it collapses us into a library | New Advent |
| Identifier-only registry | Useful, but not teaching-with-provenance | CatholicOS / CDCF |
| Hosted chatbot | Productizes inference; bypasses inspectable context | My Catholic Guide and other apps, later |
| Vector search as canonical truth | Indexes are derived; Git is canonical | Future Catholic Context Cloud, if at all |

Managed search, MCP, and inference may exist later as **paid convenience over the same objects**. They must remain reproducible from or traceable to the repository.

## Sketch of a later public contract

This is illustrative. Do not implement these routes until knowledge objects and the website already speak this shape.

```text
GET /v0/knowledge
GET /v0/knowledge/{id}
GET /v0/sources
GET /v0/harness/principles
GET /v0/evals
GET /v0/schema
```

A knowledge payload should be the schema object plus resolution metadata, for example:

```yaml
id: eucharist.real-presence
title: Real Presence of Christ in the Eucharist
entity_type: teaching
classification:
  claim_type: doctrine
  certainty: null
review:
  status: draft
summary: ...
sources:
  - source_type: catechism
    reference: CCC 1374
    url: https://www.vatican.va/archive/ENG0015/__P41.HTM
  - source_type: doctor-of-the-church
    reference: ST III q.75 a.1
    url: https://www.newadvent.org/summa/4075.htm
    note: Access copy of the 1920 Dominican translation; not the author.
external_ids: []
canonical_revision: <git commit>
```

Rules for every response:

1. Include `review.status`. Never upgrade it in the API layer.
2. Include sources. Do not return unsourced theological assertions.
3. Link to authorized or evaluated access URLs. Do not inline third-party full text.
4. External IDs are optional aliases. Catholic Context `id` remains canonical.
5. Draft objects must be labeled as draft in machine-readable form, not only in surrounding prose.

## Self-hosted versus managed

```text
Open contract (this repo)
        │
        ├─ Website build (v0.1)
        ├─ git clone / dataset download
        ├─ later: self-hosted API process
        └─ later: Catholic Context Cloud
              (keys, uptime, search, MCP, inference)
```

Self-hosting should be possible from the open foundation. Cloud should charge for operating that convenience. Neither path may make the knowledge itself proprietary.

## When to start building

Start an OpenAPI file in this repository when all of the following are true:

1. The knowledge-object schema has been used by a website (or other renderer) without needing a second parallel shape
2. There are enough objects that list/get/filter is a real problem, not a hypothetical
3. At least one external consumer (My Catholic Guide or another app) would call it
4. Source-rights behavior for responses is written down and testable

Until then, improve the schema, the objects, and the website. Those are the API.
