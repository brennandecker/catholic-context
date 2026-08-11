# CatholicContext.org — Product Design System & Experience Guidelines

## 1. Product definition

Catholic Context is the open knowledge and AI-grounding infrastructure for Catholicism.

It has three public layers:

- **Knowledge** — What does the Catholic Church teach?
- **Harness** — How should Catholic-grounded AI reason and behave?
- **Evals** — Does the AI faithfully represent Catholic teaching?

CatholicContext.org is the human-readable interface to those systems.

## 2. Design source-of-truth precedence

This document defines product and UX principles, but visual fidelity is governed in this order:

1. My Catholic Guide production source when locally available (`brennandecker/mycatholicguide`, especially `docs/` and `apps/web/app/`).
2. [`DESIGN_FIDELITY.md`](DESIGN_FIDELITY.md).
3. This document.
4. [`WEBSITE_IMPLEMENTATION.md`](WEBSITE_IMPLEMENTATION.md).

If an older recommendation conflicts with the locked tokens, type stack, zero-radius rule, or paper treatment in `DESIGN_FIDELITY.md`, the fidelity document wins.

## 3. Relationship to My Catholic Guide

My Catholic Guide and Catholic Context are one design family with different jobs.

### My Catholic Guide

Personal, guided, devotional, educational, conversational, and journey-oriented.

It answers:

> How do I understand and live the Catholic faith?

### Catholic Context

Scholarly, structured, transparent, source-grounded, collaborative, technical when necessary, and open-source.

It answers:

> What does the Catholic Church teach, where does that teaching come from, and how can humans and software faithfully use it?

```text
Catholic Context
Open infrastructure
      ↓ powers
My Catholic Guide
Personal Catholic experience
```

Catholic Context must look unmistakably related to My Catholic Guide without cloning its consumer page layouts.

## 4. Design north star

> **A modern Catholic library built for the AI era.**

The interface should communicate:

- reverence without ornamentation
- authority without pretending to possess ecclesiastical authority
- scholarship without academic intimidation
- technology without looking like a technology startup
- Catholic identity without visual cliché
- openness without looking like developer tooling

Avoid generic SaaS, GitHub-like, Wikipedia-like, dashboard-heavy, chatbot-first, parish-bulletin, or Vatican-imitation aesthetics.

## 5. Locked visual language

Catholic Context inherits the validated My Catholic Guide visual system.

Core characteristics:

- warm paper surfaces
- brown ink rather than sterile black
- missal-red accents
- serif/editorial typography
- zero-radius controls
- fine rules and borders
- warm subtle shadows
- paper-grain texture
- liturgical glyph punctuation
- generous whitespace
- print/editorial information hierarchy

Prefer typography, spacing, and rules over containers. Prefer editorial sections over card grids. Prefer source-led reading layouts over dashboards.

## 6. Locked color system

Use these tokens unless the current My Catholic Guide production source intentionally changes them:

```text
Paper / primary background      #f3ead8
Ink / primary body              #3d2817
Dark heading ink                #2d1810
Missal red / primary accent     #8b2a1f
Muted brown                     #6b4a30
Rule / strong border            #c19a6b
Soft rule                       #d4b896
Light surface                   #faf3e0
Warm highlight                  #e8d5a8
Secondary brown                 #8b5a3c
Optional near-paper surface     #fbf6e9
```

Missal red is part of the family and may be used for primary actions, active states, selected editorial accents, key links, and important labels. Use it with restraint.

Do not create a new independent Catholic Context palette.

## 7. Locked typography

Use the validated four-font hierarchy:

### Cormorant Garamond

Italic-forward display type for:

- hero statements
- expressive section introductions
- major quotations
- signature editorial moments

### EB Garamond

Primary long-form reading type for:

- body copy
- theological summaries
- source explanations
- knowledge pages
- governance prose

### IM Fell English SC

Small-cap/editorial interface type for:

- navigation
- section labels
- eyebrows
- metadata labels
- buttons where appropriate
- classification labels

### Caveat

Marginalia/handwritten annotations only. Use sparingly and never for essential interface content.

Do not replace this hierarchy with a generic modern sans-serif design system.

## 8. Type scale

Use responsive values consistent with My Catholic Guide. Starting guidance:

- Hero: 48–72px
- H1: 40–52px
- H2: 30–38px
- H3: 22–28px
- Body large: 18–20px
- Body: 16–18px
- Metadata: 13–14px
- Eyebrow/small caps: 11–13px with deliberate tracking

Long theological reading columns should generally remain around 680–780px.

## 9. Shape language

**Zero radius is the default.**

Buttons, inputs, search fields, bordered surfaces, chips, and content panels should generally use square corners.

Do not introduce rounded SaaS cards, pill controls, or bubbly UI patterns.

## 10. Borders, rules, and shadows

Use thin warm rules, typically based on `#c19a6b` or `#d4b896`.

Horizontal rules are a primary organizational device.

Use warm, restrained shadows where needed. The effect should feel like paper or physical print, not floating dashboard cards.

Avoid neon, colored glows, large blurred shadows, or heavy elevation systems.

## 11. Paper texture

Use the paper-grain overlay from the My Catholic Guide/fidelity system.

Texture must remain subtle enough that:

- body copy is highly readable
- contrast meets accessibility requirements
- the page feels editorial rather than skeuomorphic

## 12. Liturgical glyph vocabulary

Approved glyphs:

```text
✠  ✦  ❦  ✟
```

Use sparingly as editorial punctuation, section markers, or visual rhythm.

Avoid emoji-style religious imagery.

## 13. Layout

Recommended maximum shell width: 1200–1280px.

Reading column: 680–780px.

Technical/reference surfaces may expand to approximately 900–1100px.

Spacing should remain generous and editorial. A useful scale is:

```text
4  8  12  16  24  32  48  64  96  128
```

Major homepage sections may use 96–128px vertical separation on desktop.

## 14. Editorial composition pattern

A recurring pattern:

```text
✦ SMALL-CAP CONTEXT

Large Editorial Statement

Short explanatory copy in a readable measure.

Primary action →
```

Example:

```text
✦ OPEN CATHOLIC KNOWLEDGE

What does the Catholic
Church teach?

Explore source-grounded Catholic teaching
with transparent citations and review history.

[ Search Catholic Context ]
```

## 15. Buttons and links

Follow My Catholic Guide production treatment.

### Primary

Missal-red or dark-ink treatment depending on context, square corners, small-cap/editorial label.

Examples:

- `EXPLORE CATHOLIC CONTEXT →`
- `SEARCH →`

### Secondary

Paper/light-surface background, warm border, square corners.

### Tertiary

Editorial text link with arrow.

Avoid oversized pill buttons and generic app-store-style CTAs.

## 16. Navigation

Desktop target:

```text
Catholic Context
Explore  Sources  Harness  Evals  Governance  Developers   GitHub ↗
```

Search must remain easy to access.

Mobile navigation should collapse cleanly while preserving search discoverability.

## 17. Homepage

The homepage must explain the project in roughly ten seconds.

### Hero

Eyebrow:

`✦ OPEN CATHOLIC KNOWLEDGE`

Headline:

`What does the Catholic Church teach?`

Supporting copy:

`Explore source-grounded Catholic teaching with transparent citations, provenance, and theological review.`

Search placeholder:

`Search Catholic teaching, Scripture, sacraments, saints...`

Supporting statement:

`Free · Open Source · Built for Humans and AI`

Suggested editorial topic links:

- Eucharist
- Mary
- Confession
- Purgatory
- Salvation
- Papacy

### Three-layer section

Use editorial columns or rule-separated sections rather than oversized cards.

**Knowledge** — What does the Church teach?

**Harness** — How should Catholic-grounded AI behave?

**Evals** — Does it behave faithfully?

### Governance section

Headline:

`Truth is not determined by popularity.`

Visual sequence:

```text
Catholic Sources
      ↓
Structured Context
      ↓
Community Contribution
      ↓
Theological Review
      ↓
Open Versioned Knowledge
```

### Open section

Headline:

`Catholic knowledge should be inspectable.`

Communicate that users may read, inspect, download, fork, build, propose corrections, and inspect revision history.

### My Catholic Guide section

Eyebrow:

`✦ EXPERIENCE THE FAITH`

Headline:

`Looking for a personal guide?`

Explain that My Catholic Guide is the personal formation/prayer product built on Catholic Context.

## 18. Search

Search is the primary interaction.

Support:

- keywords
- natural-language questions
- titles
- IDs/slugs
- source references
- related concepts
- entity types

Search results should read like an editorial index, not a grid of product cards.

Example:

```text
INTERCESSION OF MARY

Catholics ask Mary to intercede with God,
just as Christians ask one another for prayer.

DOCTRINE · THEOLOGICALLY REVIEWED

CCC 956 · CCC 2677

Mary · Communion of Saints · Intercession
```

## 19. Knowledge detail page

This is the central product experience.

Recommended order:

```text
SACRAMENTS / EUCHARIST

Real Presence of Christ
in the Eucharist

DOCTRINE
DRAFT — THEOLOGICAL REVIEW PENDING

Summary

Sources

Understanding the Teaching

Related Context

Provenance

Suggest a Correction
```

The canonical summary must appear before deep metadata.

## 20. Review states

Always show explicit text, not color alone.

### Draft

`DRAFT — THEOLOGICAL REVIEW PENDING`

### Community reviewed

`COMMUNITY REVIEWED`

### Theologically reviewed

`THEOLOGICALLY REVIEWED`

Never use `Verified`, `Official`, `Church Approved`, or `Vatican Approved` without a real ecclesiastical process authorizing such language.

### Source-fidelity assessment (separate from review state)

Where present, also expose source-fidelity metadata:

- representation type (`direct-citation`, `paraphrase`, `summary`, `synthesis`, `entity-metadata`)
- confidence score for source match (not doctrinal certainty)
- whether theological review is needed
- whether sources are linkable

Visualize source-match confidence with an editorial meter (square track, missal-red fill, small-cap “Source match” label, percentage).

**Labeling rule:** call it source match / source fidelity. Never present the meter as “confidence this teaching is true,” Church approval, or theological review.

## 21. Sources

Sources are first-class content, not hidden footnotes.

Each source should expose:

- source type
- title/name
- exact reference
- optional context note
- external link where appropriate

Do not invent numerical authority scores.

## 22. Provenance

Every knowledge entry should eventually expose:

- review state
- reviewer or reviewer group
- review date
- version/revision
- last updated
- canonical GitHub file
- revision history

Transparency is a core product feature.

## 23. Corrections and feedback

Every knowledge page should provide `SUGGEST A CORRECTION →`.

Initial flow may create a structured GitHub Issue.

Correction categories may include:

- doctrinal accuracy
- citation problem
- better source
- missing context
- unclear wording
- historical accuracy
- translation
- schema/data
- other

Never ask users to vote on whether Catholic teaching is true.

Good feedback framing:

- `Was this explanation helpful?`
- `Should reviewers consider this change?`

Voting may prioritize review; it does not determine doctrine.

## 24. Harness

Route: `/harness`

Eyebrow:

`✦ CATHOLIC HARNESS`

Headline:

`How should Catholic-grounded AI behave?`

Explain:

- source grounding
- authority
- theological distinctions
- moral reasoning
- uncertainty
- citations
- pastoral boundaries
- escalation to human guidance

The foundational boundary must be visible:

> Catholic Context assists human beings in understanding Catholic teaching and applying Catholic moral principles. It does not possess spiritual authority, administer sacraments, replace conscience, or claim knowledge of God's particular will for an individual.

## 25. Evals

Route: `/evals`

Eyebrow:

`✦ CATHOLIC EVALS`

Headline:

`Does the AI behave faithfully?`

Evaluation families include:

- doctrine
- moral reasoning
- source fidelity
- authority
- hallucination resistance
- pastoral boundaries

Model results, if added, should read like research findings rather than a gamified leaderboard.

## 26. Governance

Route: `/governance`

Eyebrow:

`✦ ACCOUNTABLE BY DESIGN`

Headline:

`Catholic teaching is not ours to redefine.`

Core statement:

> Repository ownership, commercial funding, contributor popularity, and AI output do not determine Catholic teaching.

## 27. Developers

Route: `/developers`

Eyebrow:

`✦ BUILD WITH CATHOLIC CONTEXT`

Headline:

`Catholic context for any application.`

Clearly separate shipping capabilities from roadmap.

Examples:

- Git repository — Available now
- Structured YAML/JSON — Available now
- JSON Schema — Available now
- Harness — Early development
- Evals — Early development
- Managed API — Planned
- MCP hosting — Planned
- SDKs — Planned/when actually shipped

The open/commercial boundary is defined in `COMMERCIAL_MODEL.md`.

## 28. Open source page

Route: `/open`

Headline:

`Built in the open.`

Explain that the knowledge, Harness, Evals, schemas, public website, and public interfaces belong to the open foundation.

Also explain that open source does not mean uncontrolled direct editing of canonical Catholic Context.

## 29. About

Explain mission, origin, relationship to My Catholic Guide, governance philosophy, open-source commitment, and theological humility.

Do not make the founder the visual or institutional centerpiece.

## 30. Footer

Suggested structure:

```text
CATHOLIC CONTEXT
Open Catholic knowledge for humans and AI.

EXPLORE
Knowledge
Sources
Harness
Evals

PROJECT
About
Governance
Contribute
GitHub

DEVELOPERS
Documentation
Schema
API
MCP

MY CATHOLIC GUIDE →
```

Include:

`Catholic Context is an independent open-source project. It does not claim official endorsement by the Holy See, a diocese, or another ecclesiastical authority unless explicitly stated.`

## 31. Accessibility

Target WCAG 2.2 AA.

Requirements include:

- semantic HTML
- keyboard navigation
- visible focus states
- correct heading hierarchy
- sufficient contrast
- screen-reader labels
- reduced-motion support
- no color-only state signaling
- accessible forms
- comfortable touch targets

## 32. Responsive design

Breakpoints:

- mobile: 320–767px
- tablet: 768–1023px
- desktop: 1024–1439px
- large: 1440px+

Knowledge pages must be exceptionally readable on phones. Do not depend on desktop-only sidebars.

## 33. Motion

Keep motion quiet and editorial.

Allowed:

- subtle fades
- small hover transitions
- accordion/disclosure transitions
- search-state transitions

Avoid parallax, dramatic scroll animation, bouncing CTAs, animated religious imagery, or excessive page transitions.

## 34. Performance and SEO

Prefer static generation/server rendering for stable knowledge content, minimal client JavaScript, optimized font loading, image optimization, efficient search indexing, and strong Core Web Vitals.

Knowledge pages should implement canonical URLs, sitemap, robots.txt, useful metadata, Open Graph, and JSON-LD where semantically appropriate.

Do not manufacture structured-data claims of ecclesiastical authority.

## 35. MVP pages

Version 0.1 should cover all eleven validated screens:

1. Home
2. Search
3. Knowledge Index
4. Knowledge Detail
5. Sources
6. Harness
7. Evals
8. Governance
9. Developers
10. Open
11. About

## 36. Commercial boundary

Catholic Context should never imply that a user must subscribe to learn what Catholicism teaches.

The open foundation includes the public knowledge layer and website.

Commercial services may monetize managed hosting, APIs, search, inference, compute, operational convenience, enterprise infrastructure, and separate products such as My Catholic Guide.

See `COMMERCIAL_MODEL.md`.

## 37. Design review requirement

Every new interface must pass these checks:

1. Would a My Catholic Guide user recognize the same design family?
2. Does Catholic Context feel more scholarly and infrastructural without becoming cold or generic?
3. Does it use the locked warm paper/ink/missal-red system?
4. Are controls square/zero-radius?
5. Is the Cormorant Garamond / EB Garamond / IM Fell English SC / Caveat hierarchy intact?
6. Is paper texture subtle and readable?
7. Are liturgical glyphs restrained?
8. Are sources, provenance, and review state visually clearer than social engagement signals?

## Canonical design statement

> **CatholicContext.org should feel like a modern Catholic library built for the AI era: open, quiet, beautiful, source-grounded, accountable, and unmistakably part of the My Catholic Guide family.**
