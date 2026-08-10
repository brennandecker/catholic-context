# CatholicContext.org — Product Design System & Experience Guidelines

## 1. Product definition

Catholic Context is the open knowledge and AI-grounding infrastructure for Catholicism.

It has three layers:

- **Knowledge** — What does the Catholic Church teach?
- **Harness** — How should Catholic-grounded AI reason and behave?
- **Evals** — Does the AI faithfully represent Catholic teaching?

CatholicContext.org is the human-readable interface into these systems.

## 2. Relationship to My Catholic Guide

**MyCatholicGuide.com is the canonical visual reference implementation.** Catholic Context should immediately feel like it belongs to the same product family.

My Catholic Guide is personal, guided, devotional, educational, conversational, and journey-oriented.

Catholic Context is scholarly, structured, transparent, source-grounded, collaborative, technical when necessary, and open-source.

The relationship is:

```text
Catholic Context
Open infrastructure
      ↓ powers
My Catholic Guide
Personal Catholic experience
```

Catholic Context should feel like the scholarly/open-source sibling of My Catholic Guide — not like a separate SaaS brand.

## 3. Design north star

> A modern Catholic library built for the AI era.

The interface should communicate:

- reverence without ornamentation
- authority without pretending to possess ecclesiastical authority
- scholarship without academic intimidation
- technology without looking like a technology startup
- Catholic identity without visual cliché

## 4. Visual language

Inherit the visual DNA of My Catholic Guide:

- editorial
- spacious
- monochromatic
- serif-forward
- minimal
- high-contrast
- deliberate
- quiet
- premium without luxury signaling

Use whitespace aggressively. Prefer typography and spacing over boxes. Prefer horizontal rules over card grids. Prefer editorial sections over dashboards.

Do not make the site look like GitHub, Wikipedia, Stripe docs, a parish website, a Vatican imitation, a church bulletin, a social network, or an AI chatbot landing page.

## 5. Color system

Use the actual My Catholic Guide tokens if available. Until then, approximate with:

- Background: `#FAF9F6`
- Primary text: `#171717`
- Secondary text: `#66635F`
- Borders: `#DDDAD4`
- Secondary surface: `#F4F2EE`

Catholic Context should remain primarily monochromatic. Do not introduce Vatican yellow, liturgical red, royal purple, gold, or blue as dominant brand colors.

Semantic states may use subtle color, but never rely on color alone.

## 6. Typography

Use the same font families as My Catholic Guide whenever technically possible.

### Display typography

Use the My Catholic Guide serif for:

- H1
- H2
- major theological statements
- article titles
- quotations
- section introductions

### Interface typography

Use the My Catholic Guide sans-serif for:

- navigation
- labels
- metadata
- buttons
- badges
- search
- filters
- technical information

Recommended scale:

- Hero: 48–72px serif
- H1: 40–52px serif
- H2: 30–38px serif
- H3: 22–28px serif
- Body large: 18–20px
- Body: 16–18px
- Metadata: 13–14px
- Eyebrow: 11–13px uppercase with tracking

Long theological content should use a reading width of roughly 680–780px.

## 7. Editorial pattern

A core pattern is:

```text
✦ SMALL UPPERCASE CONTEXT

Large Serif Statement

Short, restrained explanatory copy.

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

## 8. Catholic symbol language

Use restrained editorial symbols such as `✦`, `✠`, `✟`, and `❦` sparingly.

Do not decorate every heading. Avoid emoji-style religious iconography.

## 9. Imagery

Catholic Context should be less image-heavy than My Catholic Guide.

When imagery is useful, prefer:

- sacred art
- historical manuscripts
- church architecture
- iconography
- archival Catholic materials
- public-domain historical works

Avoid generic stock photography. Do not present AI-generated sacred imagery as historical Catholic art.

## 10. Layout

Recommended maximum page width: 1200–1280px.

Reading column: 680–780px.

Technical/reference pages may expand to 900–1100px.

Do not allow theological prose to span the full desktop width.

Spacing should feel editorial. Recommended scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

Major homepage sections should commonly use 96–128px vertical separation on desktop.

## 11. Borders, radius, and shadows

Use thin neutral borders, typically 1px.

Use restrained radii:

- controls: 4–6px
- search: 6–8px
- cards: 6–8px

Avoid large pill shapes and excessive 16–32px SaaS-style rounding.

Use shadows extremely sparingly. Hierarchy should come from typography, spacing, borders, and background contrast.

## 12. Buttons

Match My Catholic Guide.

Primary: dark background, light text, minimal radius.

Secondary: transparent/light background, thin border.

Tertiary: text link.

Examples:

- `EXPLORE CATHOLIC CONTEXT →`
- `VIEW ON GITHUB →`
- `Read the governance model →`

Avoid oversized pill buttons.

## 13. Navigation

Desktop:

```text
Catholic Context
Explore  Sources  Harness  Evals  Governance  Developers   GitHub ↗
```

Search should always be easy to access.

Mobile should collapse cleanly without losing search discoverability.

## 14. Homepage

The homepage must explain Catholic Context within roughly ten seconds.

### Hero

Eyebrow: `✦ OPEN CATHOLIC KNOWLEDGE`

Headline: `What does the Catholic Church teach?`

Supporting copy: `Explore source-grounded Catholic teaching with transparent citations, provenance, and theological review.`

Primary search field placeholder: `Search Catholic teaching, Scripture, sacraments, saints...`

Supporting statement: `Free · Open Source · Built for Humans and AI`

Suggested editorial links: Eucharist, Mary, Confession, Purgatory, Salvation, Papacy.

### Three layers

Avoid three giant SaaS cards. Use editorial columns with subtle separators.

**Knowledge** — What does the Church teach?

**Harness** — How should Catholic-grounded AI behave?

**Evals** — Does it behave faithfully?

### Governance section

Headline: `Truth is not determined by popularity.`

Show:

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

### Open-source section

Headline: `Catholic knowledge should be inspectable.`

Users should understand they can read, inspect, download, fork, build, suggest corrections, contribute, and inspect revision history.

### My Catholic Guide section

Eyebrow: `✦ EXPERIENCE THE FAITH`

Headline: `Looking for a personal guide?`

Copy should explain that My Catholic Guide is the personal formation and prayer experience powered by Catholic Context.

## 15. Search

Search is the primary interaction.

Support:

- keyword search
- natural-language questions
- titles
- source references
- related concepts

Search results should feel editorial, not like generic cards.

Example:

```text
INTERCESSION OF MARY

Catholics ask Mary to intercede with God,
just as Christians ask one another for prayer.

DOCTRINE · THEOLOGICALLY REVIEWED

CCC 956 · CCC 2677

Mary · Communion of Saints · Intercession
```

Filters may include entity type and review state. Review state should influence presentation but should not silently hide drafts.

## 16. Knowledge detail page

This is the central Catholic Context experience.

Recommended structure:

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

The canonical summary should appear immediately. Do not bury it beneath metadata.

## 17. Review status

Review status must always be visible.

### Draft

`DRAFT — THEOLOGICAL REVIEW PENDING`

Explanation: `This entry has not completed Catholic Context's theological review process.`

### Community reviewed

`COMMUNITY REVIEWED`

Explanation: `Contributors have reviewed this entry. Community review does not itself constitute theological approval.`

### Theologically reviewed

`THEOLOGICALLY REVIEWED`

Explanation: `This entry has completed the applicable Catholic Context theological review process.`

Never use `Verified`, `Official`, `Church Approved`, or `Vatican Approved` unless an actual ecclesiastical relationship explicitly permits it.

## 18. Sources

Sources are a primary feature, not footnotes.

Each source should show:

- source type
- title
- exact reference
- short context note
- external link where appropriate

Do not invent numerical authority scores.

## 19. Related context

Use editorial links, not recommendation carousels.

Example:

```text
RELATED CONTEXT

Transubstantiation →
The Eucharist →
The Mass →
Sacraments →
```

## 20. Provenance

Every knowledge entry should eventually expose:

- review status
- reviewed by
- review date
- version
- last updated
- canonical GitHub file
- revision history

Transparency is a core product feature.

## 21. Corrections and community feedback

Every knowledge page must include `SUGGEST A CORRECTION →`.

Initial implementation may create a structured GitHub Issue.

Correction categories:

- doctrinal accuracy
- citation problem
- better source
- missing context
- unclear wording
- historical accuracy
- translation
- schema/data
- other

Do not ask `Is this Catholic teaching true?` with voting.

Use feedback framing such as:

- `Was this explanation helpful?`
- `Should reviewers consider this change?`

Voting prioritizes review. Voting does not determine doctrine.

## 22. Harness

Route: `/harness`

Eyebrow: `✦ CATHOLIC HARNESS`

Headline: `How should Catholic-grounded AI behave?`

The page should explain source grounding, authority, moral reasoning, uncertainty, citations, pastoral boundaries, and human escalation.

A central principle must be visible:

> Catholic Context assists human beings in understanding Catholic teaching and applying Catholic moral principles. It does not possess spiritual authority, administer sacraments, replace conscience, or claim knowledge of God's particular will for an individual.

## 23. Moral reasoning

The Harness page may show the reasoning scaffold:

```text
QUESTION
   ↓
MORAL OBJECT
   ↓
INTENTION
   ↓
CIRCUMSTANCES
   ↓
RELEVANT TEACHING
   ↓
HUMAN DIGNITY
   ↓
VIRTUE / JUSTICE / COMMON GOOD
   ↓
PRUDENTIAL JUDGMENT
   ↓
SOURCES + CONCLUSION
```

Clearly identify it as a framework subject to theological governance.

## 24. Evals

Route: `/evals`

Eyebrow: `✦ CATHOLIC EVALS`

Headline: `Does the AI behave faithfully?`

Show evaluation families including doctrine, moral reasoning, source fidelity, authority, hallucination resistance, and pastoral boundaries.

Each eval should show prompt, expected characteristics, failure conditions, and sources.

Any future model scoring should be presented like research results, not gamified leaderboards.

## 25. Governance

Route: `/governance`

Eyebrow: `✦ ACCOUNTABLE BY DESIGN`

Headline: `Catholic teaching is not ours to redefine.`

Explain theological review, reviewer qualification, contribution governance, disputes, re-review, commercial independence, financial support, and revision history.

Core statement:

> Repository ownership, commercial funding, contributor popularity, and AI output do not determine Catholic teaching.

## 26. Developers

Route: `/developers`

Eyebrow: `✦ BUILD WITH CATHOLIC CONTEXT`

Headline: `Catholic context for any application.`

Clearly mark status:

- Git repository — Available now
- Structured YAML/JSON — Available now
- JSON Schema — Available now
- Harness — Early development
- Evals — Early development
- API — Planned
- MCP Server — Planned
- SDK — Planned

Never imply a feature exists before it ships.

## 27. Open source

Route: `/open`

Headline: `Built in the open.`

Explain that Catholic Context exists so Catholic knowledge infrastructure does not have to belong to one company or AI provider.

Prominent CTA: `VIEW ON GITHUB →`

## 28. About

Explain mission, origin, relationship to My Catholic Guide, governance philosophy, open-source commitment, and theological humility.

Do not make the founder the centerpiece. The institution and mission should be larger than an individual contributor.

## 29. Footer

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

Disclaimer:

`Catholic Context is an independent open-source project. It does not claim official endorsement by the Holy See, a diocese, or another ecclesiastical authority unless explicitly stated.`

## 30. Accessibility

Target WCAG 2.2 AA.

Requirements:

- semantic HTML
- keyboard navigation
- visible focus states
- correct heading hierarchy
- sufficient color contrast
- screen-reader labels
- reduced-motion support
- no color-only status signaling
- accessible forms
- comfortable touch targets

## 31. Responsive behavior

Breakpoints:

- mobile: 320–767px
- tablet: 768–1023px
- desktop: 1024–1439px
- large: 1440px+

Knowledge pages must be exceptionally readable on phones. Do not depend on desktop-only sidebars.

## 32. Motion

Motion should be restrained: subtle fades, small hover transitions, accordion transitions, and search-state transitions only.

Avoid parallax, dramatic scroll effects, bouncing CTAs, animated religious imagery, and excessive page transitions.

## 33. Performance

Prefer server rendering/static generation, minimal client JavaScript, optimized fonts and images, efficient search indexing, and excellent Core Web Vitals.

## 34. SEO

Knowledge pages should be highly indexable with canonical URLs, sitemap, robots.txt, Open Graph, structured metadata, and JSON-LD where appropriate.

Example title:

`Real Presence of Christ in the Eucharist | Catholic Context`

## 35. URL architecture

Recommended:

```text
/
/search
/knowledge
/knowledge/eucharist
/knowledge/eucharist/real-presence
/sources
/sources/catechism
/harness
/harness/moral-reasoning
/harness/pastoral-boundaries
/evals
/evals/doctrine
/evals/boundary/gods-will
/governance
/developers
/open
/about
```

Use stable, human-readable URLs.

## 36. MVP pages

Version 0.1 should ship:

1. Homepage
2. Search
3. Knowledge index
4. Knowledge detail
5. Sources
6. Harness
7. Evals
8. Governance
9. Developers
10. Open Source
11. About

## 37. MVP capabilities

Users should be able to:

- search Catholic Context
- browse knowledge
- inspect sources
- see theological classification
- see review status
- explore related concepts
- inspect provenance
- view canonical GitHub content
- suggest corrections
- propose content
- inspect Harness principles
- inspect Evals
- understand governance
- download/fork the project

No account is required for v0.1.

## 38. Tone of voice

Catholic Context should communicate with precision, humility, confidence, clarity, reverence, intellectual seriousness, and accessibility.

Avoid culture-war language, partisan framing, internet-apologetics rhetoric, triumphalism, unnecessary defensiveness, AI hype, startup jargon, or excessive theological jargon without explanation.

Prefer wording such as:

- `The Catholic Church teaches...`
- `Catholic teaching distinguishes...`
- `The Catechism states...`
- `Catholic theologians have differed regarding...`
- `This question involves prudential judgment...`
- `Catholic Context has not yet completed theological review of this entry.`

## 39. AI boundary

The website must never present Catholic Context or an AI implementation as a priest, confessor, spiritual director, bishop, the Magisterium, oracle, God's voice, or replacement for conscience.

## 40. Commercial boundary

Users should never get the impression that they need to subscribe to learn what Catholicism teaches.

Monetize personalized experiences, compute, inference, memory, convenience, premium applications, collaboration, hosting, and enterprise infrastructure — not foundational Catholic Context knowledge.

## 41. Component philosophy

Before creating a component, ask whether typography and spacing can solve the problem.

Preferred components:

- Header
- Footer
- Search
- Breadcrumb
- Editorial section
- Source reference
- Review status
- Metadata row
- Related context link
- Citation
- Correction CTA
- Code block
- Eval case
- Disclosure
- Button
- Text link

Avoid an enormous component library.

## 42. Shared design tokens

Where possible, extract the actual My Catholic Guide design tokens and reuse them across both codebases.

Long-term shared token categories:

```text
font.serif
font.sans
color.background
color.surface
color.foreground
color.muted
color.border
spacing.*
radius.*
typography.*
button.*
breakpoint.*
```

A future shared package may be appropriate, but do not create one until the codebases make that worthwhile.

## 43. Design review requirement

Every interface should pass two tests:

1. Would a My Catholic Guide user immediately recognize this as belonging to the same family?
2. Does Catholic Context feel more scholarly and infrastructural than My Catholic Guide without becoming cold or technical?

Both conditions must be satisfied.

## Canonical design statement

> CatholicContext.org should feel like a modern Catholic library built for the AI era: open, quiet, beautiful, source-grounded, accountable, and unmistakably part of the My Catholic Guide family.
