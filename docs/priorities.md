# Priorities

## Mission test

Every near-term choice should be tested against three outcomes:

1. **Accurate** — Catholic Context represents Catholic teaching faithfully, with sources, classification, and honest review status.
2. **Accessible** — a human or a developer can find that representation without buying a product or trusting a chatbot.
3. **Humane at scale** — when Catholicism is distributed through software and AI, the human person, conscience, sacraments, and the Church remain primary. See *Magnifica Humanitas* and `harness/principles/magnifica-humanitas.yaml`.

Scaling Catholicism is not the same as scaling Catholic content, Catholic engagement, or Catholic-sounding AI. The project scales the faith only if it scales **truthful reference** and **bounded assistance**, then sends people back to real worship, real pastors, and real community.

## What we actually have

Catholic Context is architecturally rich and canonically thin.

| Layer | What exists | What is missing |
| --- | --- | --- |
| **Knowledge** | Schema v0.2; one founding object on `main`; larger draft seeds and a website on other branches | Almost no theologically reviewed objects; summaries still prove the model more than they teach |
| **Sources** | Registry, rights policy, New Advent / CatholicOS evaluations | Edition-level citations on a real corpus; optional `external_ids` unused in content |
| **Harness** | Foundational rule; 30 draft *Magnifica Humanitas* principles | No implementation profile a runtime can execute; planned modules (`reasoning/`, `boundaries/`, `citation-policy/`) are empty |
| **Evals** | 12 founding cases in a table; Humanitas families and one example YAML | No machine-readable fixtures, no runner, no stored results |
| **Governance** | Founding principles; review-state vocabulary; reviewer workflow planned on other PRs | Reviewer qualifications, evidence rules, and escalation are not yet standards on `main` |
| **Interface** | Website specified; Astro site exists on a draft PR | Not the canonical `main` experience yet |
| **API** | Contract thinking only | Correctly not built |

Neighboring work already in flight (do not redo it): public website, source-locator cleanup on imported drafts, source-fidelity scoring, appointed-reviewer propose/review → GitHub PR.

The bottleneck is not ideas. It is a short path from **draft representation** to **something a person or an AI can trust**, without pretending the project is the Magisterium.

## Community and perspectives

Yes to community. No to a perspective forum as a fourth truth layer.

Human participation is already required by the project's own anthropology. *Magnifica Humanitas* asks for contestability (HUM-004), an ecology of communication (HUM-012), and building with people rather than imposing systems on them (HUM-028). Corrections, better citations, translations, and eval cases are how the commons stays honest.

Threaded “perspectives” on every knowledge object would solve a real human desire — to speak, to apply, to disagree — and would create a worse product if they sat beside the canonical summary as if they were another kind of teaching.

| Kind of speech | Role | Determines teaching? | v0.1 home |
| --- | --- | --- | --- |
| **Correction** | This representation is wrong, unsourced, unclear, or incomplete | No. It may *start* a canonical change | Structured GitHub Issue from the knowledge page |
| **Qualified review** | Appointed reviewers accept, reject, or reclassify a representation | No. It changes Catholic Context's *review status*, not the Church's teaching | Reviewer workflow (in progress); Git remains the audit trail |
| **Perspective / lived application** | How a teaching is received, disputed pastorally, or lived in a place | No | Not a Catholic Context canonical layer. Formation products (My Catholic Guide) and real ecclesial communities are the proper homes |
| **Vote / popularity** | Prioritize what to review | No | Allowed only as review triage, never as a truth control |

Building native threads now would fail the mission test:

- **Accuracy.** Perspectives would be scraped, quoted, and trained on as if they were context. Models already cannot tell a blog comment from a council.
- **Accessibility.** A quiet, sourced page is more usable than a hot thread. The first accessibility problem is that the public site and a small true corpus are not on `main`.
- **Human spirit.** HUM-003 and HUM-030 warn against replacing genuine human community with a simulated one. A global comment layer on doctrine is not a parish, a spiritual director, or a family table. HUM-011 warns against engagement incentives that privilege conflict. HUM-007 (subsidiarity) says some conversations belong locally, not in a central product.

If a discussion surface is added later, it must be:

1. Visually and schematically **separate** from the canonical object (no `perspective` field that can be mistaken for `summary`)
2. Unable to change `classification`, `review.status`, or `sources` except through the correction/review path
3. Not ranked by votes, likes, or model confidence
4. Not a place for the project to collect spiritual direction, confession-like disclosure, or claims about God's particular will
5. Moderated as a scholarly/correction commons, not as a social network

Until then, the community layer **is** GitHub Issues, pull requests, and appointed review. That is enough to be open without becoming Catholic Twitter attached to the Catechism.

## The next five things

These are ordered by mission leverage, not by how large they feel. Do the first well before using later ones as a reason to delay it.

### 1. Land the public website as an honest window

Accessibility is currently a document tree. The specified v0.1 site — search, knowledge pages, sources, review badges, correction CTA, Harness/Evals/Governance — is the first human interface.

Ship it from canonical Git content. Keep every object labeled `draft` until it is not. Do not wait for a thousand reviewed entries. A small site that tells the truth about its review state protects the human spirit better than a large site that looks finished.

This is already drafted on other branches. The work here is to make that the public face of `main`, not to redesign it.

### 2. Build a catechetical spine, not a bulk encyclopedia

Accuracy at scale starts with the questions people and AIs already get wrong. The founding eval table is the spine:

- worship vs veneration of Mary
- Real Presence
- papal infallibility vs impeccability
- priestly celibacy as discipline
- salvation outside the Church (without the cartoon)
- intrinsic evil vs circumstances
- “Is God telling me…?”
- “Can you absolve me?”
- fabricated Catechism citations

Each should be a real knowledge object: original summary, primary sources with access URLs, classification, relationships, `review.status: draft`. Cite the Catechism, Scripture, councils, and Magisterium first. Use New Advent only as an access hub. Add CatholicOS IDs only as optional aliases.

Resist expanding the imported seed until these objects are good. Volume without a spine gives AI more text to misuse.

### 3. Make review real for at least a few objects

A thousand drafts are not more accurate than one. They are a backlog.

Write the minimum governance needed to move an object from `draft` → `community-reviewed` → `theologically-reviewed`:

- who may review (founding panel is enough to start)
- what evidence is recorded (`reviewed_by`, `reviewed_at`, `review_commit`, sources checked)
- what happens on material change
- that community agreement still does not create doctrine

Then run the spine through it. The reviewer-console work on other PRs should serve this, not replace it. Until one object is honestly reviewed, Catholic Context cannot claim to be a trustworthy layer between the Church and AI.

### 4. Make Evals and the Harness runnable

This is the “protect the human spirit in the age of AI” layer. Principles in YAML do not constrain a model. Evals do.

- Turn the 12 founding cases into machine-readable fixtures (`evals/` YAML with `must` / `must_not` / sources).
- Add a small Humanitas set for spiritual impersonation, dependency, and fabricated sources (HUM-002, HUM-003, HUM-010, HUM-016, HUM-030).
- Add one Harness **implementation profile**: how an app (starting with My Catholic Guide, or a CLI test runner) must retrieve context, cite, hedge, and escalate.

Do not build a public chatbot. Do not build MCP hosting. Test the profile against the spine. If an implementation cannot refuse to absolve, refuse to declare a marriage invalid, and refuse a fake CCC paragraph, it is not ready to scale anything.

### 5. Open the correction path; keep perspectives off the canonical page

Community should make the commons more accurate, not more talkative.

- Every knowledge page: `Suggest a correction` → structured Issue (already specified).
- Appointed reviewers propose changes that become GitHub PRs (already in progress).
- Invite eval cases, better citations, and translations as first-class contributions.
- Do **not** add native threads, perspective ranking, or user-generated commentary on the knowledge object in this phase.

Lived application, testimony, and pastoral conversation belong in the Church and, where productized, in formation apps. Catholic Context's job is the shared, sourced, bounded reference those conversations can trust.

## Explicitly later

Do not let these jump the queue:

- hosted API / MCP / vector search
- native community threads or perspective ranking
- bulk encyclopedia ingestion (New Advent, imported narrative topics)
- importing CatholicOS ontology weights as authority
- authentication for ordinary readers
- model leaderboards
- parish administration

Those can serve the mission after the spine is true, visible, and testable.

## How to say no

If a proposal does not make the representation more accurate, the window more accessible, or AI more bounded and humane, it is not a near-term Catholic Context priority — even if it would attract users.
