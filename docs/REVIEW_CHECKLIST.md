# Review checklist

This is the minimum evidence required to move a knowledge object along the review path. It does not confer Church approval.

Automation, including this repository's Worker and `scripts/apply-proposal.py`, **must not** set `review.status: theologically-reviewed`.

## Path

`draft` → `community-reviewed` → `theologically-reviewed`

Every material change returns the object to `draft`.

## Draft → community-reviewed

An appointed **community reviewer** (founding panel or later allowlist) may set `community-reviewed` only when all of the following are true:

1. The summary is original Catholic Context prose, not a pasted copyrighted edition.
2. Every `sources[]` entry has a `reference`, a `source_type`, and an access `url` where one exists (Vatican, USCCB, or an evaluated hub).
3. `classification.claim_type` is set, or the object is honestly `entity-metadata` with `classification: null` and a note.
4. `source_fidelity.needs_theological_review` remains `true`.
5. Related IDs resolve to objects that exist, or the dangling IDs are listed in `notes`.
6. `reviewed_by` records the **platform public username**, `reviewed_at` is an ISO timestamp, and `review_commit` is the merge SHA (filled after merge).

Community review improves the *representation*. It does not establish doctrine.

## Community-reviewed → theologically-reviewed

An appointed **theological reviewer** may set `theologically-reviewed` only when:

1. The community-reviewed checklist still holds.
2. The reviewer has checked the cited sources against the summary (not against popularity or model confidence).
3. Claim type, certainty, and pastoral-boundary objects (absolution, particular will, canonical status) are correctly classified.
4. The reviewer is listed on `governance/founding-reviewer-panel.md` (or a later published panel list).
5. Evidence is recorded in Git: `reviewed_by`, `reviewed_at`, `review_commit`.

Until that happens, every object on `main` should remain `draft` even if it looks finished.

## What this checklist is not

- Not a vote.
- Not Persona IDV.
- Not a “Church-approved” or “verified” badge.
- Not permission for AI to impersonate clergy.

See `docs/theological-review.md`, `docs/REVIEWER_CORRECTION_WORKFLOW.md`, and `docs/SOURCE_RIGHTS.md`.
