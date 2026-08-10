# CatholicContext.org — Locked Design Fidelity Reference

This document records the high-fidelity visual decisions validated against the real My Catholic Guide design system. It supersedes any earlier approximate token values or rounded-control guidance.

## Source-of-truth precedence

For CatholicContext.org implementation, use this order of authority:

1. My Catholic Guide production source tokens and components when available locally.
2. This locked fidelity reference.
3. `docs/DESIGN_SYSTEM.md` for product/UX principles.
4. `docs/WEBSITE_IMPLEMENTATION.md` for technical implementation requirements.
5. Local implementation judgment where the documents are silent.

If an older document conflicts with this file on visual tokens, typography, radius, or surface treatment, this file wins.

## Production reference

The validated My Catholic Guide reference is:

```text
repo: brennandecker/mycatholicguide
branch: main
paths:
  - docs/
  - apps/web/app/
```

When that repository is available in the same Cursor workspace, inspect `docs/design-system.md`, `apps/web/app/globals.css`, and `apps/web/app/layout.tsx` before re-creating styles manually.

## Locked palette

Use the actual warm Catholic editorial palette:

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
```

Additional near-paper surfaces may use values already present in the My Catholic Guide production CSS, such as `#fbf6e9`, where appropriate.

Missal red is intentional and part of the existing family. Use it with restraint for links, active states, liturgical/editorial accents, important labels, and primary actions. Do not flood pages with red.

## Locked typography

Use this four-font stack unless the production My Catholic Guide source has intentionally changed:

- **Cormorant Garamond, italic-forward** — display typography, major hero statements, expressive editorial moments.
- **EB Garamond** — long-form body copy, theological summaries, source explanations, reading surfaces.
- **IM Fell English SC** — navigation, small caps, section labels, metadata labels, buttons where appropriate.
- **Caveat** — marginalia and handwritten annotations only; use sparingly.

Do not replace the interface with a generic modern sans-serif design system. The editorial type stack is a primary part of the product identity.

## Shape language

**Zero radius is the default.**

Buttons, inputs, chips, cards, search fields, and bordered surfaces should generally use square corners (`border-radius: 0`) unless a production My Catholic Guide component explicitly establishes a different treatment.

Do not introduce rounded SaaS cards or pill controls.

## Shadows

Use warm, subtle shadows drawn from the My Catholic Guide system. Shadows should feel physical/paper-like rather than floating or glossy.

Avoid:

- large blurred SaaS shadows
- neon glows
- colored drop shadows
- elevated dashboard-card effects

## Paper texture

Use the paper-grain overlay established in the fidelity prototype / My Catholic Guide system. It should be subtle enough that text readability remains excellent.

The site should feel printed/editorial rather than sterile-digital, without becoming skeuomorphic.

## Liturgical glyph vocabulary

The approved symbol vocabulary is:

```text
✠  ✦  ❦  ✟
```

Use these as restrained editorial punctuation and section markers. Do not use emoji-style Catholic symbols or decorate every heading.

## Layout character

The high-fidelity treatment should remain:

- spacious
- print/editorial
- warm
- source-focused
- restrained
- square-cornered
- typography-led
- rule-separated rather than card-heavy

Whitespace, horizontal rules, columns, and typography should establish hierarchy before containers do.

## Screen coverage

The fidelity prototype validated the full v0.1 screen map:

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

Shared shell, header, footer, buttons, chips, cards/surfaces, typography, and responsive patterns should remain consistent across all eleven pages.

## Design relationship

My Catholic Guide should feel personal, guided, devotional, and journey-oriented.

Catholic Context should feel like the same design family matured into a scholarly/open-source reference institution.

The visual difference should come from information architecture and density — not from inventing a second visual brand.

## Implementation test

Before approving a page, ask:

1. Does this look like it came from the same design system as My Catholic Guide?
2. Does it feel more scholarly and infrastructural without becoming a generic documentation site?
3. Are the locked paper/ink/missal-red tokens being respected?
4. Are controls square rather than SaaS-rounded?
5. Is the four-font editorial hierarchy intact?
6. Is the paper texture subtle and readable?
7. Is Catholic symbolism restrained rather than decorative?

If any answer is no, revise before considering the page design-complete.
