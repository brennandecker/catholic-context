---
name: review-context-entry
description: Assess Catholic Context knowledge entries for source fidelity—representation type, linkable citations, confidence score, and whether theological review is needed. Use when reviewing context/*.yaml, PRs that change knowledge objects, or when asked to citation-check an entry. Never grants theological approval.
---

# Review Context Entry (Source Fidelity)

## Purpose

Determine whether a Catholic Context entry **faithfully represents cited sources** and whether it should be tagged as needing human theological review.

This skill is **not** theological review and must never set:

```yaml
review:
  status: theologically-reviewed
```

## Read first

1. `docs/theological-review.md`
2. `docs/authority-model.md`
3. `schema/catholic-context.schema.json`
4. The target file(s) under `context/`

## What to assess

For each knowledge object:

1. **Representation type**
   - `direct-citation` — essentially quotes/points to one official passage
   - `paraphrase` — close restatement of one passage, no added claims
   - `summary` — compressed restatement of one bounded source/passage set
   - `synthesis` — combines sources, infers implications, adds framing
   - `entity-metadata` — person/place/event identity fields, not a claim essay

2. **Linkable sources**
   - Prefer official/public locators (Vatican, official canon-law / CCC references with URLs)
   - Set `linkable_sources: true` only if primary supporting sources are openable or have stable public locators
   - Missing `url` values are unresolved issues unless a stable public locator is documented in the assessment rationale

3. **Confidence score (`0`–`1`)**
   - Score only: “Does the wording match the cited sources?”
   - Do **not** score whether Catholic teaching is true
   - Do **not** invent citations to raise confidence
   - Lower confidence when claims exceed the cited text, sources are missing/unopened, or classification looks overstated

4. **Needs theological review**
   Set `needs_theological_review: true` if any apply:
   - representation is `synthesis`
   - non-trivial/contested claim classification
   - sources not linkable
   - paraphrase/summary appears to add uncited claims
   - pastoral/personal guidance present
   - confidence `< 0.85` for teaching/sacrament/liturgy claim objects

   May set `false` only for tightly source-bound `direct-citation` / `paraphrase` / narrow `summary` with high confidence and linkable official sources.

## Procedure

1. Load the YAML entry and validate against `schema/catholic-context.schema.json`.
2. For each cited source, attempt to open/verify the referenced passage when a URL or well-known public locator exists.
3. Compare entry `summary` (and notes if claim-bearing) against the source text.
4. Classify representation; compute confidence; decide `needs_theological_review`.
5. Write/update the `source_fidelity` block on the object.
6. Leave `review.status` unchanged unless a human explicitly requests a governance-status edit (and never to `theologically-reviewed` via this skill).

## Output format to write on the object

```yaml
source_fidelity:
  representation: paraphrase
  confidence: 0.9
  needs_theological_review: false
  linkable_sources: true
  assessed_by: review-context-entry
  assessed_at: "2026-08-11T00:00:00Z"
  rationale: >-
    Summary tracks CCC 1374 closely; outbound CCC locator resolves; no synthetic claims added.
  unresolved_issues: null
```

Or, when escalation is required:

```yaml
source_fidelity:
  representation: synthesis
  confidence: 0.55
  needs_theological_review: true
  linkable_sources: false
  assessed_by: review-context-entry
  assessed_at: "2026-08-11T00:00:00Z"
  rationale: >-
    Combines multiple sources and asserts classification beyond a single passage.
  unresolved_issues:
    - Missing URL for primary catechism citation
    - Summary adds unity/ecclesiology claims not present in cited paragraph
```

## Report back to the user

Also provide a short human report:

- representation
- confidence
- needs theological review? (yes/no)
- linkable sources? (yes/no)
- top unresolved issues
- explicit reminder: this is source-fidelity tagging, not theological approval

## Hard prohibitions

- Do not invent Scripture, CCC, conciliar, or magisterial citations
- Do not reproduce large copyrighted source passages into the repo
- Do not mark entries `theologically-reviewed`
- Do not treat high confidence as doctrinal certainty
- Do not ask users to vote on whether doctrine is true
