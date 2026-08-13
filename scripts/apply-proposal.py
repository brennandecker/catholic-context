#!/usr/bin/env python3
"""Apply a structured correction proposal to a knowledge YAML file.

This is the canonical-edit helper for the reviewer loop. A later Worker/GitHub
App should call the same patch rules instead of writing markdown-only PRs.

Proposal JSON:
{
  "target_path": "context/doctrine/mary-worship.yaml",
  "set": { "summary": "...", "notes": "..." },
  "add_sources": [{ "source_type": "catechism", "reference": "CCC 971", "url": null, "note": null }],
  "reviewer": "cc_u_example"
}
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
ALLOWED_SET = {"summary", "notes", "title"}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--proposal", required=True, help="Path to proposal JSON")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    proposal = json.loads(Path(args.proposal).read_text())
    target = ROOT / proposal["target_path"]
    if not str(target.resolve()).startswith(str((ROOT / "context").resolve())):
        print("Refusing to patch a file outside context/", file=sys.stderr)
        return 1
    if not target.exists():
        print(f"Missing {target}", file=sys.stderr)
        return 1

    data = yaml.safe_load(target.read_text())
    for key, value in (proposal.get("set") or {}).items():
        if key not in ALLOWED_SET:
            print(f"Unsupported set field: {key}", file=sys.stderr)
            return 1
        data[key] = value
    for source in proposal.get("add_sources") or []:
        if "source_type" not in source or "reference" not in source:
            print("add_sources entries need source_type and reference", file=sys.stderr)
            return 1
        data.setdefault("sources", []).append(
            {
                "source_type": source["source_type"],
                "reference": source["reference"],
                "url": source.get("url"),
                "note": source.get("note"),
            }
        )
    if "review" in data and isinstance(data["review"], dict):
        # Never auto-upgrade theological review.
        if data["review"].get("status") == "theologically-reviewed":
            print("Refusing to patch a theologically-reviewed object via this helper", file=sys.stderr)
            return 1
        data["review"]["status"] = "draft"
        if proposal.get("reviewer"):
            data["review"]["reviewed_by"] = None

    rendered = "# DRAFT — theological review pending\n" + yaml.dump(
        data, sort_keys=False, allow_unicode=True, width=88
    )
    if args.dry_run:
        print(rendered)
        return 0
    target.write_text(rendered)
    print(f"Patched {proposal['target_path']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
