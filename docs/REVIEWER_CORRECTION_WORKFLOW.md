# Reviewer Correction Workflow Plan

## Objective

Build a closed loop where **approved reviewers** can propose corrections in the CatholicContext.org UI, those proposals become **GitHub pull requests** against canonical YAML, and **approved reviewers** can then review those PRs in the UI before merge — with a long-term path to a **Persona-verified panel of theologians**.

Git remains the source of truth. The website never silently mutates doctrine.

## Non-goals

- Popularity votes determining Catholic teaching
- Letting ID verification alone confer theological authority
- Public users gaining direct write/merge access to canonical content
- Agents or automation setting `review.status: theologically-reviewed`
- Storing government-ID images or sensitive PII in the open repository

## Principles (must not drift)

1. **Truth is not determined by vote** — UI review is qualified judgment, not a poll.
2. **Sources + theological review govern** — proposals must cite sources; status changes follow governance.
3. **Identity ≠ competence** — Persona IDV proves a real person (and optionally document claims). Theological panel membership still requires **manual appointment by the founder** (during the founding stage), plus whatever qualifications and COI disclosure the project publishes. Automation never auto-admits reviewers.
4. **Commercial independence** — funding (including free Persona credits) must not buy review outcomes.
5. **Open audit trail** — every canonical change lands as a Git commit/PR; provenance fields point at that history.

## Actors and trust tiers

| Tier | Who | Can do | How admitted |
|---|---|---|---|
| **Public** | Anyone | Suggest correction → GitHub Issue (current) | None |
| **Authenticated contributor** | Signed-in user | Richer proposal form; draft PR via bot | GitHub OAuth |
| **Maintainer** | Repo maintainers | Merge technical/safe changes; administer infra | GitHub team |
| **Community reviewer** | Appointed | Approve non-doctrinal / source-structure improvements; may set path toward `community-reviewed` | **Founder manual approval** → allowlist |
| **Theological reviewer** | Qualified panelist | Approve representation/classification/framing; may set `theologically-reviewed` when process allows | **Founder manual approval** (+ later Persona IDV after appointment) |
| **Verified theological reviewer** (long-term) | Panelist with completed IDV | Same as theological reviewer; UI shows verified identity badge on *panel membership*, not on doctrine | Founder-appointed **and** Persona inquiry passed |

**Founding-stage decision (locked):** the repository founder **manually approves every reviewer**. No self-serve elevation, no automatic admission from IDV, credentials upload, or GitHub org membership alone.

Badge copy must never imply “Church-approved” or “Vatican-verified.” Prefer: **“Identity verified · Project panelist.”**

## Target end-to-end flows

### A. Propose a correction (UI)

1. Reviewer opens a knowledge object → **Propose correction**.
2. Structured form (not free HTML): affected fields, category, proposed text, rationale, supporting sources, “material change?” flag.
3. Submit creates a **Proposal** record (private store) and asks a **GitHub App** to open a branch + PR patching `context/**/*.yaml`.
4. PR body uses the project PR template + review-impact checklist.
5. Site shows proposal status: `draft` → `pr-open` → `changes-requested` → `approved` → `merged` / `closed`.

### B. Review a proposal (UI)

1. `/review` queue lists open PRs that touch knowledge (and optionally harness/evals).
2. Diff view: current vs proposed YAML rendered as human-readable sections + raw diff.
3. Checklist: source fidelity, claim classification, framing, pastoral boundaries, re-review trigger.
4. Actions map to GitHub: comment, request changes, approve.
5. **Merge** remains maintainer-controlled (or required dual approval: maintainer + theological reviewer for material doctrinal changes).

### C. Write-back on merge

On merge (GitHub webhook → Worker):

- Rebuild/deploy site from repo (existing static path)
- Ensure YAML carries updated `review.*` and refreshed `source_fidelity` when material
- Provenance shows `reviewed_by`, `reviewed_at`, `review_commit`

### D. Panel onboarding (long-term + Persona)

1. Candidate applies (CV/ordination/academic credentials, diocese/order if applicable, COI, areas of competence).
2. **Founder manually approves or rejects** (founding stage). Later stages may delegate appointment per published governance, but never remove the human gate.
3. After approval → optional/required **Persona IDV** (government ID + optional selfie) when Phase 4 is live.
4. On `approved` inquiry: mark `identity_verified_at` in private reviewer directory (not in open YAML). IDV success without prior founder approval does nothing.
5. Publish public panel listing: display name, role, competence areas, verification status — **no** government ID numbers, address, DOB, or document images in git.

## Phased roadmap

### Phase 0 — Document & govern (now)

**Deliverables**

- This plan
- Fill `governance/` stubs: reviewer qualifications, COI, evidence, appeals, material-change re-review
- Define badge/status vocabulary (no “Church-approved”)
- Decide merge policy: who can merge what class of change

**Exit criteria**

- Written rules for who may become a community vs theological reviewer
- Explicit statement: IDV is anti-fraud / personhood, not Magisterial authority

### Phase 1 — Structured proposals → GitHub PR (MVP loop)

Keep current public Issue CTA. Add reviewer path:

| Piece | Notes |
|---|---|
| GitHub OAuth on site | Login for contributors/reviewers |
| Allowlist of reviewer GitHub usernames | Private config; **only founder-approved** accounts; no auto-add from applications |
| Correction form on knowledge pages | Prefills context id/slug; validates required fields |
| GitHub App | Opens PR from bot account; labels `correction`, `needs-theological-review` when flagged |
| Minimal `/review` page | Lists open correction PRs via GitHub API; links to GitHub for approve/merge if UI actions not ready |

**Exit criteria**

- An allowlisted reviewer can submit a UI proposal that opens a real PR
- Public users still use Issues without auth

### Phase 2 — In-UI review actions

| Piece | Notes |
|---|---|
| Side-by-side rendered diff | Summary/sources/classification |
| Approve / request changes from UI | GitHub GraphQL/REST under App installation |
| Required checks | Branch protection: 1 maintainer review; theological label requires panelist approval |
| Write-back helper | PR may include suggested `review` metadata; merge bot validates only humans set `theologically-reviewed` |
| Audit log | Private: who acted, when, PR URL |

**Exit criteria**

- Full propose → review → merge loop usable without leaving the site (GitHub remains audit backbone)

### Phase 3 — Reviewer directory & panel UX

| Piece | Notes |
|---|---|
| Private reviewer profiles | Role, competence tags, COI attestations, appointment dates |
| Public `/governance/panel` (or section) | Names/roles of appointed reviewers who opt in to public listing |
| Assignment | Route proposals by competence (sacraments, moral, liturgy, etc.) |
| Re-review automation | Material change on `theologically-reviewed` entry auto-downgrades or flags needs re-review |

### Phase 4 — Persona IDV for verified panelists

**Product intent:** Verify that panelists are real persons (and reduce sockpuppet / reputation-fraud risk) before they receive merge-critical theological powers.

**What Persona verifies**

- Government ID (+ optional selfie/liveness)
- Optionally document workflows later (diplomas, faculties) via Personas Workflows/Cases — **treat credential documents as governance evidence reviewed by humans**, not as automatic panel admission

**What Persona does *not* verify**

- Catholic orthodoxy
- Canonical mission
- Teaching authority

**Funding path (Persona Startup Program)**

Public program (see [Persona Startup Program](https://help.withpersona.com/articles/1XNnqukfZY9VamF2e7jkuJ/) and [withpersona.com/startups](https://withpersona.com/startups/)):

- **500 free verifications / month for 12 months** (General cohort: Gov ID + optional selfie; overage ~$1/ea)
- Fintech cohort adds watchlists/PEP (usually unnecessary for this use case → prefer **General**)
- Typical eligibility signals: early-stage / &lt;$5M funding / &lt;50 employees / independently owned SMB; use-case fit; community contribution
- Card on file required; charged only past quota
- Self-serve community/Slack; not full enterprise support

**Application narrative for Persona**

Use case to emphasize:

> Catholic Context maintains an open knowledge base of Catholic teaching. Theological reviewers can propose and approve canonical edits. We need government-ID verification to ensure panelists are real people before granting elevated review rights — trust & safety for a high-integrity knowledge commons, not payments KYC.

Volume estimate (honest, low):

- Founding panel: ~10–30 people
- Ongoing: &lt;50 inquiries / month for years unless scaled aggressively
- Well within 500/month free tier → cost ≈ $0 during program year

**Post-program**

- Budget IDV from governance allocation of project revenue/donations ([GOVERNANCE.md](../GOVERNANCE.md) §6)
- Or renew/negotiate nonprofit / mission pricing with Persona if available
- Keep a manual exception path for reviewers who cannot complete IDV for legitimate reasons (with heightened human vetting)

**Privacy & data handling**

- Persona hosts ID documents per their platform; Catholic Context stores only: Persona `inquiry_id`, status, timestamps, reviewer internal id
- Do **not** commit PII to git
- Publish a short privacy notice on the panel application page
- Support deletion/offboarding when a panelist resigns

**Exit criteria**

- Appointed reviewers can complete Persona inquiry
- UI shows verified-panelist state only after both **appointment** and **IDV approved**
- At least one end-to-end correction by a verified panelist merged with provenance filled

### Phase 5 — Scale & hardening

- Multi-reviewer quorum for disputed doctrine
- Appeals workflow (governance workstream)
- Translations / multilingual review assignment
- Optional institution partnerships (seminary, faculty) with org verification (KYB) later — still separate from Magisterial claims
- Metrics dashboards (time-to-review, reopen rate, fidelity score deltas) — never “votes for truth”

## Technical architecture (target)

```text
Browser (CatholicContext.org)
    │  GitHub OAuth / session
    ▼
Cloudflare Worker (or equivalent BFF)
    │
    ├── Proposal store (private DB: Supabase/D1/KV)
    ├── Reviewer directory (private; roles, Persona refs)
    ├── GitHub App (PRs, checks, webhooks)
    └── Persona API (Inquiries / Workflows)  [Phase 4]
            │
            ▼
      GitHub repo (canonical YAML)
            │
            ▼
      Static site build / deploy
```

**Open vs private boundary** (aligns with [COMMERCIAL_MODEL.md](COMMERCIAL_MODEL.md)):

| Open repo | Private / managed |
|---|---|
| Knowledge YAML, schemas, site source | OAuth sessions, allowlists, Persona inquiry ids |
| Governance standards (qualifications text) | COI private filings, IDV raw results |
| PR/issue history (public) | Moderator audit logs if sensitive |

## Schema / metadata additions (later)

Keep knowledge objects free of PII. Prefer:

```yaml
review:
  status: theologically-reviewed
  reviewed_by: panel:liturgy-2026   # opaque panel/group id, not email
  reviewed_at: "..."
  review_commit: "abc123"
```

Private directory maps `panel:liturgy-2026` → people. Optional public display names resolved at render time.

## Governance work to unblock Phase 2–4

Create under `governance/` (planned in [governance/README.md](../governance/README.md)):

1. **Reviewer qualifications** — education, faculties, publication, pastoral roles; Catholic identity requirements if any; competence tags
2. **Appointment & removal** — founding stage: founder manually approves/removes everyone; document any later delegation without removing a human gate
3. **Conflicts of interest** — disclosure, recusal
4. **Evidence standards** — what a reviewer must cite to approve
5. **Appeals & disputed content**
6. **Material change definition** — when `theologically-reviewed` is invalidated
7. **IDV policy** — when required, exceptions, retention, international reviewers

Until those land, keep `theologically-reviewed` rare and conservative ([theological-review.md](theological-review.md)).

## Near-term implementation slice (recommended first build)

Ship Phase 1 only:

1. GitHub OAuth + session cookies on the Worker-backed site routes that need auth (static pages can deep-link into authenticated app section)
2. Env allowlist `REVIEWER_GITHUB_IDS`
3. `/propose/[...slug]` form → GitHub App creates PR
4. `/review` index of open PRs
5. Keep public **Suggest a Correction → Issue** for everyone else

Defer Persona until a real candidate panel exists — IDV before process would only verify strangers.

## Persona outreach checklist

When ready for Phase 4:

- [ ] Confirm entity eligibility (startup/SMB thresholds)
- [ ] Apply via Persona dashboard Billing → Startup Program (General cohort)
- [ ] Draft use-case blurb (trust & safety for reviewer panel)
- [ ] Estimate monthly inquiries (panel size + churn)
- [ ] Implement Inquiry template: Gov ID + selfie; webhook → mark verified
- [ ] Write privacy notice + data-retention policy
- [ ] Soft-launch with 3–5 founding panelists
- [ ] Track free-tier headroom; plan post-12-month budget

## Success metrics

- Time from proposal → first reviewer action
- % of corrections with resolvable source links
- Re-open / revert rate after merge
- Panel capacity (active verified reviewers × competence coverage)
- IDV pass rate and exception rate (ops health, not theology)

Not success metrics: upvotes, likes, or traffic-weighted doctrine.

## Decisions

| Topic | Decision |
|---|---|
| Founding appointing authority | **Founder manually approves everyone** (no auto-admission) |

## Open questions

1. Must theological reviewers be clergy, or may qualified lay theologians serve?
2. Public visibility of individual reviewer names on each object vs panel-level attribution?
3. Host proposal UI on the open Worker vs a small private “review console” app?
4. Dual approval rule for material doctrinal edits — hard requirement from day one of Phase 2?

## Related documents

- [GOVERNANCE.md](../GOVERNANCE.md)
- [governance/README.md](../governance/README.md)
- [theological-review.md](theological-review.md)
- [WEBSITE_IMPLEMENTATION.md](WEBSITE_IMPLEMENTATION.md) (current Issue-based correction flow)
- [COMMERCIAL_MODEL.md](COMMERCIAL_MODEL.md)
- [architecture.md](architecture.md)
