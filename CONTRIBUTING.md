# Contributing to Catholic Context

Thank you for helping make Catholic knowledge more accessible, structured, and trustworthy.

## Ways to contribute

- Correct an inaccurate or unclear summary
- Add or improve primary-source citations
- Propose a new context object
- Identify missing theological nuance
- Improve schemas or developer tooling
- Improve documentation
- Propose translations

## Theological contributions

Community consensus does not establish Catholic teaching. When proposing a theological change:

1. State precisely what should change.
2. Explain why.
3. Provide supporting sources whenever possible.
4. Prefer authoritative Catholic sources over secondary commentary.
5. Clearly distinguish doctrine, discipline, theological opinion, devotional practice, and historical claims.
6. If proposing a new recurring source family, access hub, or identifier commons, add or update an evaluation under `sources/evaluations/` rather than citing the hub as if it were the Magisterium.

## Content status

New theological content should normally begin with:

```yaml
review:
  status: draft
```

Do not mark material `theologically-reviewed` unless the review requirements defined by project governance have been satisfied.

## Corrections

A useful correction explains the problem and proposes a solution. Helpful categories include:

- Doctrinal accuracy
- Citation does not support the claim
- Better primary source available
- Missing context
- Unclear language
- Historical accuracy
- Translation issue
- Schema/data issue

## Pull requests

Keep changes focused. A theological PR should identify the context objects affected and the sources relied upon. Technical PRs should explain any schema or compatibility impact.

By contributing, you agree that your original contributions may be distributed under the applicable Catholic Context license described in `LICENSING.md`.
