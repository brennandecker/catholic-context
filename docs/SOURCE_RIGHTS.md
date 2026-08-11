# Catholic Context — Source Rights Policy

## Purpose

Catholic Context is designed to be source-grounded without treating access to a source as permission to redistribute it.

This policy governs how contributors, maintainers, coding agents, ingestion pipelines, and downstream Catholic Context applications should handle copyrighted and otherwise rights-restricted source material.

This is a project policy, not legal advice. Source-specific terms should be checked when there is uncertainty about a proposed use.

## Core rule

> **Reference, structure, summarize, and cite third-party Catholic sources. Do not ingest or redistribute their complete text unless Catholic Context has verified that the applicable rights permit it.**

A source being freely readable on the web does not make it public domain, open source, or compatible with Catholic Context's CC BY 4.0 content license.

## Catechism of the Catholic Church

The text of the *Catechism of the Catholic Church* must be treated as third-party copyrighted material.

Catholic Context should therefore normally store:

- document title
- paragraph numbers
- source type
- source/publisher metadata
- canonical or authorized source URL
- original Catholic Context summaries
- original structured claims
- relationships to other Catholic Context objects
- review/provenance metadata
- short excerpts only when the proposed use is permitted and necessary

Catholic Context must **not** place the complete Catechism text into the openly licensed repository merely because an authorized edition is freely readable online.

The same principle applies to bulk ingestion intended to reconstruct or redistribute substantially all of a copyrighted edition.

## Example

Preferred:

```yaml
id: eucharist.real-presence
title: Real Presence of Christ in the Eucharist
summary: >-
  Original Catholic Context summary of the teaching.
sources:
  - type: catechism
    title: Catechism of the Catholic Church
    paragraphs: [1373, 1374, 1375, 1376]
    canonical_url: https://www.vatican.va/archive/ENG0015/_INDEX.HTM
    third_party: true
```

Avoid:

```yaml
source_text: |
  [large or complete reproduced passage from the Catechism]
```

unless the project has specifically verified and documented permission for that reproduction.

## Source-rights classification

Where practical, source registry records should distinguish rights status using metadata such as:

```yaml
rights:
  status: third-party-copyrighted
  redistribution: restricted
  full_text_in_repository: false
  excerpts: source-terms-dependent
  attribution_required: true
  notes: Verify publisher/rightsholder terms before reproducing text.
```

Suggested `rights.status` values:

- `catholic-context-original`
- `public-domain`
- `open-license`
- `third-party-copyrighted`
- `permission-granted`
- `unknown`

`unknown` must be treated conservatively until verified.

## Other Catholic sources

Do not assume a uniform copyright status across:

- Scripture translations
- papal documents and translations
- conciliar documents and translations
- canon law publications
- liturgical books and texts
- prayers
- hymn texts
- theological books and articles
- saints' writings
- historical translations
- episcopal conference publications

Copyright may differ by original work, translation, jurisdiction, edition, publisher, and format.

A work's theological authority and its copyright status are separate questions.

## Public-domain sources

When a source is believed to be public domain, document why before bulk inclusion.

Prefer recording:

- edition
- translator, if applicable
- publication date
- jurisdictional basis when material
- source URL
- rights determination date

Do not infer that a modern translation is public domain merely because the underlying ancient or historical work is public domain.

## Openly licensed sources

For Creative Commons or other openly licensed material:

- record the exact license
- record the source URL
- preserve required attribution
- respect share-alike, noncommercial, no-derivatives, or other conditions
- verify compatibility before combining/relicensing content

Do not label a source simply `open` without recording the actual license.

## Excerpts

Use excerpts only when they materially improve the knowledge object or user experience.

Prefer the minimum excerpt necessary to support the purpose.

Every excerpt should remain attributable to its third-party source and must not silently become part of Catholic Context's CC BY 4.0 original-content corpus.

If a source or rightsholder publishes explicit quotation or permissions rules, those rules should be recorded in the source registry and followed.

## Summaries and structured context

Catholic Context should generally create its own:

- summaries
- classifications
- structured propositions
- source mappings
- relationships
- explanatory context
- Harness requirements
- Evals

These original materials can be licensed under the project's applicable open license while the underlying cited source remains governed by its own rights.

A summary must be genuinely original and should not function as a disguised near-verbatim reproduction of a copyrighted source.

## AI and automated ingestion

Coding agents, language models, crawlers, and ingestion jobs must follow the same policy as human contributors.

They must not:

- scrape a copyrighted Catholic work and commit the complete text to the repository without verified rights
- convert a copyrighted webpage, PDF, ebook, or database into a repository copy merely for convenience
- paraphrase so closely that the output effectively reproduces the source
- assume that model access to a document grants redistribution rights
- remove copyright notices or provenance

Automated pipelines should default to metadata, citations, identifiers, links, and original summaries unless rights metadata explicitly permits fuller ingestion.

## Website and API behavior

CatholicContext.org and future APIs should expose Catholic Context's original structured context while linking users to authorized source destinations where appropriate.

A managed Catholic Context API does not gain additional redistribution rights merely because it is commercial or hosted privately.

Commercial and open-source deployments must both respect third-party source rights.

## Pull requests and review

A pull request that adds substantial third-party source text should identify:

1. the source and edition
2. the rightsholder or license, if known
3. why the proposed reproduction is permitted
4. required attribution or notices
5. whether the material may be redistributed under Catholic Context's distribution model

If those questions cannot be answered, reviewers should request conversion to citations, metadata, links, and original Catholic Context summaries instead.

## Removal and correction

If Catholic Context discovers that third-party material has been included without appropriate rights, maintainers should remove or replace the material while preserving appropriate historical/audit information where legally and technically suitable.

## Relationship to licensing

This policy supplements `LICENSING.md`.

Catholic Context's open licenses apply only to material the project has the right to license. They do not override copyright, contractual restrictions, or licenses governing cited third-party works.
