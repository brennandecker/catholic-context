#!/usr/bin/env python3
"""Print corpus review gaps. Does not change review.status."""

from __future__ import annotations

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CONTEXT = ROOT / "context"


def walk() -> list[Path]:
    return sorted(CONTEXT.rglob("*.yaml"))


def main() -> int:
    rows = []
    for path in walk():
        data = yaml.safe_load(path.read_text()) or {}
        sources = data.get("sources") or []
        missing_urls = sum(1 for s in sources if not s.get("url"))
        classification = data.get("classification")
        claim = None
        if isinstance(classification, dict):
            claim = classification.get("claim_type")
        fidelity = data.get("source_fidelity") or {}
        rows.append(
            {
                "id": data.get("id"),
                "status": (data.get("review") or {}).get("status"),
                "claim": claim,
                "missing_urls": missing_urls,
                "fidelity": fidelity.get("representation"),
                "needs_review": fidelity.get("needs_theological_review"),
                "path": path.relative_to(ROOT).as_posix(),
            }
        )

    drafts = [r for r in rows if r["status"] == "draft"]
    print(f"{len(rows)} objects, {len(drafts)} draft")
    print("id\tstatus\tclaim\tmissing_urls\tfidelity")
    for row in rows:
        print(
            f"{row['id']}\t{row['status']}\t{row['claim']}\t{row['missing_urls']}\t{row['fidelity']}"
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
