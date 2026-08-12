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
| **Platform account** | Signed-in Catholic Context user | Propose corrections in UI (if appointed); review queue (if appointed) | Platform auth (not GitHub) |
| **Maintainer** | Repo maintainers | Merge PRs; administer infra | GitHub team (maintainers only — not reviewers) |
| **Community reviewer** | Appointed platform user | Approve non-doctrinal / source-structure improvements; may set path toward `community-reviewed` | **Founder manual approval** → platform allowlist |
| **Theological reviewer** | Qualified panelist | Approve representation/classification/framing; may set `theologically-reviewed` when process allows | **Founder manual approval** (+ later Persona IDV after appointment) |
| **Verified theological reviewer** (long-term) | Panelist with completed IDV | Same as theological reviewer; UI shows verified identity badge on *panel membership*, not on doctrine | Founder-appointed **and** Persona inquiry passed |

**Founding-stage decision (locked):** the repository founder **manually approves every reviewer**. No self-serve elevation, no automatic admission from IDV, credentials upload, or GitHub accounts.

**Identity decision (locked):** **Reviewers do not need GitHub accounts.** They sign in on Catholic Context. GitHub pull requests exist for change management and open-source visibility only. Every PR attributes work to a **platform public username** — a unique ID assigned by Catholic Context — not a GitHub login.

Badge copy must never imply “Church-approved” or “Vatican-verified.” Prefer: **“Identity verified · Project panelist.”**

## Target end-to-end flows

### A. Propose a correction (UI)

1. Reviewer signs in on Catholic Context (platform session — **not** GitHub OAuth).
2. Opens a knowledge object → **Propose correction**.
3. Structured form (not free HTML): affected fields, category, proposed text, rationale, supporting sources, “material change?” flag.
4. Submit creates a **Proposal** record (private store) and asks a **GitHub App** (bot) to open a branch + PR patching `context/**/*.yaml`.
5. PR title/body always include the proposer’s **platform public username** (unique platform ID) and opaque platform user id for audit.
6. Site shows proposal status: `draft` → `pr-open` → `changes-requested` → `approved` → `merged` / `closed`.

### B. Review a proposal (UI)

1. Appointed reviewers use `/review` on the site (platform auth). They never need a GitHub login.
2. Diff view: current vs proposed YAML rendered as human-readable sections + raw diff.
3. Checklist: source fidelity, claim classification, framing, pastoral boundaries, re-review trigger.
4. UI actions (approve / request changes / comment) are recorded in the platform and mirrored onto the PR by the GitHub App as bot comments/reviews that name the reviewer’s **platform public username**.
5. **Merge** remains maintainer-controlled on GitHub (maintainers may use GitHub; reviewers do not have to).

### C. Write-back on merge

On merge (GitHub webhook → Worker):

- Rebuild/deploy site from repo (existing static path)
- Ensure YAML carries updated `review.*` and refreshed `source_fidelity` when material
- Provenance shows `reviewed_by` as the **platform public username** (or panel group id), plus `reviewed_at`, `review_commit`

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
| Platform auth | Email magic-link or passwordless session on Catholic Context — **no GitHub account required for reviewers** |
| Platform public username | Unique, immutable (or tightly controlled) handle assigned by the platform at account creation / appointment (e.g. `cc_u_…` or chosen unique slug); used on PRs and provenance |
| Founder allowlist | Private store of platform user ids the founder has approved — not GitHub usernames |
| Correction form on knowledge pages | Prefills context id/slug; validates required fields |
| GitHub App (bot only) | Opens/updates PRs; PR body credits `Proposed by: @<platform-public-username>`; labels `correction`, `needs-theological-review` when flagged |
| Minimal `/review` page | Lists open correction PRs for appointed platform users; optional read-only link to GitHub for the public |

**Exit criteria**

- A founder-approved platform user (no GitHub account) can submit a UI proposal that opens a real PR attributed to their platform public username
- Public users still use Issues without auth

### Phase 2 — In-UI review actions

| Piece | Notes |
|---|---|
| Side-by-side rendered diff | Summary/sources/classification |
| Approve / request changes from UI | Platform records the action under the reviewer’s platform id; GitHub App mirrors a bot review/comment naming that public username |
| Required checks | Branch protection for maintainers; theological gate is platform allowlist + UI approval, not GitHub CODEOWNERS for theologians |
| Write-back helper | PR may include suggested `review` metadata using platform public username; merge bot validates only humans set `theologically-reviewed` |
| Audit log | Private: platform user id, public username, when, PR URL |

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
    │  Platform session (not GitHub)
    ▼
Cloudflare Worker (or equivalent BFF)
    │
    ├── Platform accounts (id + public username + auth)
    ├── Proposal store (private DB: Supabase/D1/KV)
    ├── Reviewer directory (private; roles, Persona refs, founder allowlist)
    ├── GitHub App bot (PRs / mirrored comments — change management + visibility)
    └── Persona API (Inquiries / Workflows)  [Phase 4]
            │
            ▼
      GitHub repo (canonical YAML; PRs show platform public usernames)
            │
            ▼
      Static site build / deploy
```

**Open vs private boundary** (aligns with [COMMERCIAL_MODEL.md](COMMERCIAL_MODEL.md)):

| Open repo | Private / managed |
|---|---|
| Knowledge YAML, schemas, site source | Platform accounts, sessions, founder allowlist, Persona inquiry ids |
| Governance standards (qualifications text) | COI private filings, IDV raw results, email addresses |
| PR/issue history (public), attributed by platform public username | Moderator audit logs if sensitive |

### Platform public username

- Assigned by Catholic Context; globally unique within the platform
- Appears on every bot-opened PR and in `review.reviewed_by` / proposal headers
- Stable identifier for open-source visibility without requiring GitHub
- Legal name may stay private; public username is the attribution handle (display name optional and separate)

## Schema / metadata additions (later)

Keep knowledge objects free of PII. Prefer:

```yaml
review:
  status: theologically-reviewed
  reviewed_by: cc_u_channing   # platform public username (not GitHub, not email)
  reviewed_at: "..."
  review_commit: "abc123"
```

Private directory maps platform public username → internal user id, appointment, Persona refs. Optional legal/display names are private or opt-in public.

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

1. Platform accounts + sessions (magic link); each user gets a unique **platform public username**
2. Founder allowlist of platform user ids (start with Channing Decker once his account exists)
3. `/propose/[...slug]` form → GitHub App bot creates PR credited to that public username
4. `/review` index for appointed platform users (no GitHub login)
5. Keep public **Suggest a Correction → Issue** for everyone else

Defer Persona until a real candidate panel exists — IDV before process would only verify strangers.

**Still needed from maintainers (not reviewers):** GitHub App credentials so the bot can open PRs. Reviewers never see that.

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
| Lay theologians | **May serve** — clerical status not required |
| First appointed reviewer | **Channing Decker** — founding theological reviewer (see [`governance/founding-reviewer-panel.md`](../governance/founding-reviewer-panel.md)) |
| Reviewer accounts | **No GitHub required** — platform auth only; GitHub PRs are bot-managed for visibility/change control |
| PR attribution | Every PR names the actor’s **platform public username** (unique platform ID) |

## Open questions

1. Public visibility of individual reviewer names on each object vs panel-level attribution?
2. Host proposal UI on the open Worker vs a small private “review console” app?
3. Dual approval rule for material doctrinal edits — hard requirement from day one of Phase 2?

## Related documents

- [GOVERNANCE.md](../GOVERNANCE.md)
- [governance/README.md](../governance/README.md)
- [theological-review.md](theological-review.md)
- [WEBSITE_IMPLEMENTATION.md](WEBSITE_IMPLEMENTATION.md) (current Issue-based correction flow)
- [COMMERCIAL_MODEL.md](COMMERCIAL_MODEL.md)
- [architecture.md](architecture.md)
