# CatholicContext.org — Website Implementation Requirements

## Purpose

Build the public website for Catholic Context as the human-readable interface to the open repository. The website should render canonical repository content, expose provenance and review status, support search and browsing, and route community corrections back into the open contribution workflow.

Before implementing UI, read these in order:

1. `docs/DESIGN_FIDELITY.md`
2. `docs/DESIGN_SYSTEM.md`
3. `docs/COMMERCIAL_MODEL.md`
4. this document

## Product constraints

1. The Git repository is the canonical record for v0.1.
2. The website source itself belongs to the open Catholic Context foundation.
3. The website must not silently create a second proprietary source of theological truth.
4. Knowledge pages must preserve source provenance and review state.
5. Draft content must never be visually confused with theologically reviewed content.
6. Voting and popularity must never determine doctrinal status.
7. The website must not imply endorsement by the Holy See, a diocese, or another ecclesiastical authority.
8. My Catholic Guide is a separate commercial reference implementation; Catholic Context remains usable without it.
9. No account is required for the v0.1 public experience.
10. Open source does not imply public direct-write access to canonical content.
11. Commercial managed infrastructure must remain separable from this open website/repository.

## Design fidelity requirement

The website must follow the locked My Catholic Guide-derived fidelity system.

Source precedence:

1. My Catholic Guide production source when available locally.
2. `docs/DESIGN_FIDELITY.md`.
3. `docs/DESIGN_SYSTEM.md`.

Do not substitute generic SaaS styling.

Key locked characteristics include:

- paper `#f3ead8`
- ink `#3d2817`
- dark heading ink `#2d1810`
- missal red `#8b2a1f`
- warm rules/borders
- zero-radius controls
- warm subtle shadows
- paper-grain texture
- Cormorant Garamond display
- EB Garamond body
- IM Fell English SC labels/navigation
- Caveat marginalia
- restrained `✠ ✦ ❦ ✟` glyph vocabulary

## Recommended application architecture

Prefer a modern React framework capable of static generation and server rendering. If the project has already chosen a framework, preserve that choice unless there is a material reason to change it.

The application should load repository YAML/JSON/Markdown during build or server execution and normalize it into typed internal representations.

Suggested structure:

```text
website/
├── app/ or pages/
├── components/
├── lib/
│   ├── content/
│   ├── search/
│   ├── github/
│   └── schema/
├── styles/
└── public/
```

Do not move canonical theological content into website source files.

## Content pipeline

The pipeline should:

1. discover supported canonical content files
2. parse YAML/JSON/Markdown as applicable
3. validate structured objects against repository schemas
4. fail loudly during development/build for invalid canonical content
5. normalize content into typed application objects
6. derive stable human-readable routes
7. generate search documents
8. generate related-content relationships
9. expose source and review metadata without mutation
10. preserve canonical GitHub traceability

Do not fabricate missing review data or source metadata.

## Core routes

Implement:

```text
/
/search
/knowledge
/knowledge/[...slug]
/sources
/harness
/evals
/governance
/developers
/open
/about
```

These correspond to the eleven validated v0.1 screens: Home, Search, Knowledge Index, Knowledge Detail, Sources, Harness, Evals, Governance, Developers, Open, and About.

## Homepage

Required sections:

1. global navigation
2. search-led hero
3. suggested knowledge topics
4. Knowledge / Harness / Evals architecture
5. governance / `Truth is not determined by popularity`
6. open-source section
7. My Catholic Guide relationship
8. footer and independence disclaimer

Search is the primary CTA.

## Knowledge index

Support browsing by entity type and taxonomy where available.

Each result should expose at minimum:

- title
- concise summary
- entity type
- theological claim classification when applicable
- review status
- key source references

Unknown or incomplete taxonomy should degrade gracefully.

## Knowledge detail

Required sections:

- breadcrumb/taxonomy context
- title
- entity type
- theological classification when applicable
- review status
- canonical summary
- sources
- related context
- provenance
- canonical GitHub link
- correction CTA

Optional explanatory prose must be clearly distinguishable from canonical summary/source metadata.

## Search

v0.1 search must work without requiring a paid external search vendor.

Support:

- title matching
- summary/content matching
- IDs/slugs
- source references
- entity types
- related terms where available

Do not block launch on embeddings or a vector database.

Search ranking should prioritize direct title and canonical-topic relevance.

## Source pages

Treat sources as first-class objects where data permits.

Display:

- source type
- title/reference
- context note
- external destination when permitted
- Catholic Context entries citing the source

Do not reproduce third-party copyrighted text merely because a citation exists.

## Review status component

Implement one shared component for:

- `draft`
- `community-reviewed`
- `theologically-reviewed`

Use explicit text, not color alone.

Do not introduce `verified`, `official`, `Church-approved`, or similar states without a governance change and actual authority for that terminology.

## Provenance component

Where available, expose:

- review state
- reviewers/reviewer group
- review date
- last modification/version
- canonical file
- revision/history destination

GitHub is the canonical public audit trail for v0.1.

## Correction flow

`Suggest a correction` should initially route to or generate a structured GitHub Issue.

Collect:

- affected context
- category
- what is wrong
- proposed change
- rationale
- supporting sources

Never ask users to vote on whether doctrine is true.

Community proposals do not directly edit canonical content. Approved maintainers control merges; theological changes may require qualified theological review.

## Harness rendering

Render Harness documentation from repository content where practical.

Required themes:

- AI is not spiritual authority
- source grounding
- theological distinctions
- moral reasoning
- uncertainty
- pastoral boundaries
- human escalation
- conformance/evaluation

## Evals rendering

Render eval cases from structured repository data once machine-readable fixtures exist. Until then, repository eval documentation may be rendered as documentation.

Future eval detail pages should support:

- prompt
- expected characteristics
- failure conditions
- relevant sources
- version
- evaluation family

Do not hard-code leaderboard claims without reproducible methodology and stored results.

## Governance rendering

The governance page should remain tightly aligned with repository governance documents.

It must prominently explain:

- community contribution does not determine doctrine
- review states
- reviewer governance
- disputes/re-review
- commercial independence
- repository ownership does not confer theological authority
- financial support does not purchase theological conclusions

## Developers page

Clearly distinguish current functionality from roadmap.

Public/open interfaces may be documented here, including future OpenAPI contracts and SDKs.

A future paid managed API should be described as an optional hosted service rather than the only way to access Catholic Context.

Read `COMMERCIAL_MODEL.md` before implementing commercial/API messaging.

## Open-source page

Explain that the open foundation includes:

- Knowledge
- Harness
- Evals
- schemas
- governance
- public documentation
- CatholicContext.org source
- public API specifications/open tooling when created

Also explain that public access permits inspection, forking, reuse, issues, and pull requests — not uncontrolled direct modification of canonical content.

## Commercial boundary

Do not add production billing, proprietary metering, customer records, production credentials, payment configuration, commercial account management, or private enterprise integrations to this repository unless there is an explicit future decision to open-source them.

The website may document managed offerings without embedding the proprietary managed-service implementation.

## GitHub integration

Link directly to canonical repository files and contribution workflows.

Do not require GitHub API authentication for ordinary public browsing.

If GitHub API calls are needed, prefer server-side use with graceful failure behavior.

## Accessibility

Target WCAG 2.2 AA.

At minimum:

- semantic landmarks
- keyboard-operable navigation/search/forms
- visible focus
- accessible form labels/errors
- sufficient contrast
- no color-only state signaling
- reduced motion
- logical heading order
- useful link text

## Performance

Prefer static generation for stable knowledge pages.

Avoid unnecessary client-side hydration.

Do not ship a heavy JavaScript application merely to render mostly static theological content.

Optimize font loading, paper texture assets, and images.

## SEO

Generate per-entry metadata from canonical content.

Implement:

- canonical URLs
- sitemap
- robots.txt
- Open Graph
- useful title/description
- JSON-LD where semantically appropriate

Do not manufacture structured-data claims of official ecclesiastical authority.

## Analytics and privacy

Analytics are optional for v0.1. If added, prefer privacy-conscious collection and document it.

Do not add invasive tracking without a clear product need.

## Security

Treat repository content as untrusted at render boundaries even though it is reviewed through Git.

- sanitize rendered Markdown/HTML
- do not execute arbitrary content
- validate external URLs
- keep secrets server-side
- avoid exposing GitHub credentials
- use dependency scanning and standard framework security practices

## MVP acceptance criteria

A v0.1 launch is acceptable when:

1. the homepage clearly explains Catholic Context
2. a visitor can search/browse available knowledge
3. a visitor can open a knowledge object
4. sources are visible
5. review status is unmistakable
6. related context works where data exists
7. provenance links to canonical GitHub content
8. correction CTA works
9. all eleven validated screens are represented
10. the site visually belongs to the My Catholic Guide family
11. locked design fidelity is respected
12. mobile reading is excellent
13. the site makes no false claim of ecclesiastical endorsement
14. build validation catches malformed canonical content
15. public contribution does not permit uncontrolled canonical editing
16. the open/commercial boundary is preserved

## Non-goals for v0.1

Do not block launch on:

- authentication
- native voting backend
- vector database
- embeddings
- AI chat
- managed commercial API implementation
- MCP hosting
- subscriptions
- parish accounts
- model leaderboards
- complex CMS
- custom moderation backend
- production billing/metering

## Build priority

1. inspect/reuse My Catholic Guide production tokens when available
2. implement locked fidelity tokens and typography
3. build content loader + schema validation
4. build global shell
5. build homepage
6. build knowledge index/detail
7. build search
8. build source/review/provenance components
9. wire correction workflow
10. render Harness/Evals/Governance docs
11. add Open/Developers/About pages
12. add SEO/accessibility/performance polish
13. deploy preview
14. perform design-fidelity and content-integrity review before public launch
