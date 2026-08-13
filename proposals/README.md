# Correction proposals

Structured correction proposals opened from Catholic Context reviewer tools land here on pull-request branches as `proposals/open/<id>.json`.

- Attribution uses the proposer’s **platform public username**, not a GitHub login.
- When the proposer supplies a summary or source patch, the same PR also edits `context/**/*.yaml` and resets `review.status` to `draft`.
- Apply JSON-only proposals with `python3 scripts/apply-proposal.py --proposal proposals/open/<id>.json`.
- Reviewers act in the site UI (`/review`); maintainers merge on GitHub.
- Automation must not set `theologically-reviewed`.
- Do not treat files in this directory as canonical doctrine.
