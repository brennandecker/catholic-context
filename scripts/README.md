# Scripts

## `run-evals.py`

Validate eval fixtures and that `knowledge_ids` resolve to objects in `context/`.

```bash
python3 scripts/run-evals.py
```

This does not call a model. Model adapters can be added later against the same fixtures.

## `apply-proposal.py`

Apply a structured JSON proposal to a `context/**/*.yaml` file. Refuses files outside `context/` and refuses to patch `theologically-reviewed` objects. Resets status to `draft`.

```bash
python3 scripts/apply-proposal.py --proposal proposal.json --dry-run
```

A later GitHub App / Worker should use these same rules instead of opening markdown-only PRs.
