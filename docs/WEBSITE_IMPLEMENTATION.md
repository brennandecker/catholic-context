# CatholicContext.org — Website Implementation Requirements

## Purpose

Build the public website for Catholic Context as the human-readable interface to the open repository. The website should render canonical repository content, expose provenance and review status, support search and browsing, and route community corrections back into the open contribution workflow.

Read `docs/DESIGN_SYSTEM.md` before implementing any UI.

## Product constraints

1. The Git repository is the canonical record for v0.1.
2. The website must not silently create a second proprietary source of theological truth.
3. Knowledge pages must preserve source provenance and review state.
4. Draft content must never be visually confused with theologically reviewed content.
5. Voting and popularity must never determine doctrinal status.
6. The website must not imply endorsement by the Holy See, a diocese, or another ecclesiastical authority.
7. My Catholic Guide is a separate commercial reference implementation; Catholic Context remains usable without it.
8. No account is required for the v0.1 public experience.

## Recommended application architecture

Prefer a modern React framework capable of static generation and server rendering. If the existing project has already chosen a framework, preserve that choice unless there is a material reason to change it.

The application should be designed so repository YAML/JSON/Markdown can be loaded during build or server execution and normalized into a typed internal representation.

Suggested conceptual structure:

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

Canonical content lives under repository knowledge/context paths and conforms to the schema under `schema/`.

The website pipeline should:

1. discover supported content files
2. parse YAML/JSON/Markdown as applicable
3. validate structured objects against the repository schema
4. fail loudly during development/build for invalid canonical content
5. normalize content into typed application objects
6. derive human-readable URLs from stable IDs/slugs
7. generate search documents
8. generate related-content relationships
9. expose source and review metadata without mutation

Do not fabricate missing review data.

## Core routes

Implement these routes first:

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

Additional source/harness/eval detail routes can follow the same pattern.

## Homepage

Implement the homepage composition defined in `docs/DESIGN_SYSTEM.md`.

Required sections:

1. global navigation
2. search-led hero
3. suggested knowledge topics
4. Knowledge / Harness / Evals architecture
5. governance / "Truth is not determined by popularity"
6. open-source section
7. My Catholic Guide relationship
8. footer and independence disclaimer

Search should be the primary CTA.

## Knowledge index

The knowledge index should support browsing by entity type and major taxonomy where available.

Do not require the taxonomy to be perfect before launch. Unknown or incomplete classifications should degrade gracefully.

Each result should expose at minimum:

- title
- concise summary
- entity type
- theological claim classification when applicable
- review status
- key source references when available

## Knowledge detail

Required fields/sections:

- breadcrumb/taxonomy context
- title
- entity type
- theological classification where applicable
- review status
- canonical summary
- sources
- related context
- provenance
- canonical GitHub link
- correction CTA

Optional explanatory prose must be clearly distinguishable from canonical summary/source metadata.

## Search

v0.1 search should work without requiring an external paid search vendor.

Support:

- title matching
- summary/content matching
- IDs/slugs
- source references
- entity types
- related terms where available

Natural-language semantic search may be added later. Do not block launch on embeddings or vector infrastructure.

Search ranking should prioritize direct title and canonical-topic relevance over semantic novelty.

## Source pages

Sources should be treated as first-class objects where the data permits.

Display source type, title/reference, context note, external destination when permitted, and the Catholic Context entries that cite the source.

Do not reproduce third-party copyrighted text merely because a citation exists.

## Review status component

Implement one shared component for review state.

Supported states:

- `draft`
- `community-reviewed`
- `theologically-reviewed`

The component must include text, not color alone.

Do not introduce `verified`, `official`, `Church-approved`, or similar states without a governance change.

## Provenance component

Where available, expose:

- review state
- reviewers
- review date
- last modification/version
- canonical file
- revision/history destination

GitHub is the canonical public audit trail for v0.1.

## Correction flow

For v0.1, `Suggest a correction` may link to or generate a GitHub Issue using the repository's structured correction workflow.

The correction flow should request:

- affected context
- category
- what is wrong
- proposed change
- rationale
- supporting source(s)

Never ask users to vote on whether doctrine is true.

## Harness rendering

Render the public Harness documentation from repository content wherever practical rather than duplicating it manually in the website.

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

Render eval cases from structured repository data once a machine-readable format exists. Until then, the current repository eval documentation may be presented as documentation.

Future eval detail pages should support:

- prompt
- expected characteristics
- failure conditions
- relevant sources
- version
- evaluation family

Do not hard-code model leaderboard claims without reproducible methodology and stored results.

## Governance rendering

The governance page should be generated from or tightly aligned with the repository governance documents.

It must prominently explain:

- community contribution does not determine doctrine
- review states
- reviewer governance
- disputes/re-review
- commercial independence
- repository ownership does not confer theological authority

## Developers page

Clearly distinguish current functionality from roadmap.

Available now should reflect only repository capabilities that actually exist.

Planned capabilities may include API, MCP, SDK, managed search, and hosted Context services, but must be labeled planned until shipped.

## GitHub integration

The website should link directly to canonical repository files and contribution workflows.

Do not require GitHub API authentication for ordinary public browsing.

If GitHub API calls are needed, prefer server-side use and graceful failure behavior.

## Design-system reuse

MyCatholicGuide.com is the visual reference implementation.

If the My Catholic Guide source repository is available locally to the developer, inspect its actual:

- fonts
- CSS variables/design tokens
- spacing
- buttons
- navigation
- typography
- border treatments
- responsive behavior

Reuse/adapt those values rather than approximating from screenshots or inventing a second brand.

Do not create a shared npm package solely for v0.1 unless both codebases already justify it. Copying a small documented token set is acceptable initially; centralize later when drift becomes a real problem.

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

Optimize font loading and images.

## SEO

Generate per-entry metadata from canonical content.

Implement:

- canonical URLs
- sitemap
- robots.txt
- Open Graph metadata
- useful title/description
- JSON-LD where semantically appropriate

Do not manufacture structured-data claims of official ecclesiastical authority.

## Analytics and privacy

Analytics are optional for v0.1. If added, prefer privacy-conscious collection and document it.

Do not add invasive tracking to an open knowledge project without a clear product need.

## Security

Treat repository content as untrusted input at render boundaries even though it is reviewed through Git.

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
9. Harness, Evals, Governance, Developers, Open, and About are readable
10. the site visually belongs to the My Catholic Guide family
11. mobile reading is excellent
12. the site makes no false claim of ecclesiastical endorsement
13. build validation catches malformed canonical content

## Non-goals for v0.1

Do not block launch on:

- authentication
- native voting backend
- vector database
- embeddings
- AI chat
- managed API
- MCP server
- subscriptions
- parish accounts
- model leaderboards
- complex CMS
- custom moderation backend

Those are later layers.

## Build priority

1. extract/adapt My Catholic Guide visual tokens
2. build content loader + schema validation
3. build global layout
4. build homepage
5. build knowledge index/detail
6. build search
7. build source/review/provenance components
8. wire correction workflow
9. render Harness/Evals/Governance docs
10. add SEO/accessibility/performance polish
11. deploy preview
12. conduct design and content-integrity review before public launch
