# Theological Review

## Objective

Catholic Context should make review status explicit and auditable rather than implying authority through presentation alone.

## Two different questions

Catholic Context separates:

1. **Source fidelity** — Does this entry faithfully represent the cited official sources, and can a reader open those sources?
2. **Theological review** — Has a qualified reviewer approved Catholic Context's representation, classification, and framing?

An automated agent or skill may help with (1). It is **not** a substitute for (2).

## Source-fidelity assessment

Optional field: `source_fidelity` on each knowledge object.

It records a machine or maintainer assessment of representation quality. It does **not** mean:

- the doctrine is true because an agent scored it
- the entry is Church-approved
- theological review is complete

### Representation types

| Value | Meaning |
|---|---|
| `direct-citation` | Entry is essentially a pointer/quotation of a single official source passage |
| `paraphrase` | Close restatement of one source passage without adding claims |
| `summary` | Compressed restatement of one source or tightly bounded passage set |
| `synthesis` | Combines multiple sources, infers implications, or adds interpretive framing |
| `entity-metadata` | Person/place/event identity metadata rather than a doctrinal claim essay |

### Confidence score

`source_fidelity.confidence` is a number from `0` to `1`.

It means:

> Confidence that Catholic Context's wording faithfully restates the cited Church sources.

The Church’s teaching stands on its own authority. This score grades **our fidelity to the source**, not whether Scripture, the Catechism, or the Magisterium is trustworthy.

Suggested bands:

- `0.85–1.00` — strong source match; outbound links resolve; little/no interpretive surplus
- `0.60–0.84` — mostly matched, but wording/coverage gaps remain
- `< 0.60` — weak match, missing links, or likely overclaim

### Needs theological review

`source_fidelity.needs_theological_review` should be `true` when any of these hold:

- representation is `synthesis`
- claim classification (`dogma`, `doctrine`, etc.) is non-trivial or contested
- sources cannot be linked/opened
- paraphrase/summary appears to add claims absent from the cited texts
- pastoral application, moral casuistry, or individual guidance is present
- confidence is below the project's promotion threshold

It may be `false` only when the entry is a tightly source-bound `direct-citation`, `paraphrase`, or narrow `summary` of official public sources with resolvable links and high confidence.

Even then, maintainers may still require theological review before changing `review.status`.

## Governance review workflow

```text
Draft
  ↓
Source-fidelity assessment (agent/skill/maintainer)
  ↓
Community feedback and source review
  ↓
Community-reviewed
  ↓
Qualified theological review (when required)
  ↓
Theologically-reviewed
```

## Draft

A draft may be created by a contributor, maintainer, import process, or AI-assisted workflow. Draft status means the content has **not** received the project's theological review.

## Community-reviewed

Community review may improve wording, citations, completeness, structure, and accuracy. Community review does not by itself establish theological approval.

## Theologically-reviewed

This status should only be applied after review under a governance process that defines:

- reviewer qualifications
- required source standards
- conflicts of interest
- review evidence
- disputed-content escalation
- re-review after material changes

Those requirements are not yet finalized. Until they are, maintainers should use this status conservatively.

**Agents and skills must never set `review.status` to `theologically-reviewed`.**

## Material changes

A material theological change to previously reviewed content should trigger re-review rather than inheriting the previous approval automatically.

A material wording/source change should also invalidate or refresh `source_fidelity`.

## Transparency

Review metadata should eventually record reviewer identity or reviewer-group identity, date, revision/commit, and review rationale where appropriate.

Source-fidelity metadata should record assessor, timestamp, confidence, representation type, linkability, and unresolved issues.
