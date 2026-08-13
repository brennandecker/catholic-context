#!/usr/bin/env python3
"""Validate Catholic Context eval fixtures and optional knowledge-id links."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
EVAL_SCHEMA = json.loads((ROOT / "evals/schema.json").read_text())
REQUIRED = EVAL_SCHEMA["required"]


def walk_yaml(directory: Path) -> list[Path]:
    if not directory.exists():
        return []
    return sorted(p for p in directory.rglob("*.yaml") if p.is_file())


def load_knowledge_ids() -> set[str]:
    ids: set[str] = set()
    for path in walk_yaml(ROOT / "context"):
        data = yaml.safe_load(path.read_text())
        if isinstance(data, dict) and "id" in data:
            ids.add(data["id"])
    return ids


def validate_case(path: Path, knowledge_ids: set[str]) -> list[str]:
    errors: list[str] = []
    data = yaml.safe_load(path.read_text())
    if not isinstance(data, dict):
        return [f"{path}: not a mapping"]
    for field in REQUIRED:
        if field not in data:
            errors.append(f"{path}: missing {field}")
    expected = data.get("expected") or {}
    if "must" not in expected or "must_not" not in expected:
        errors.append(f"{path}: expected.must and expected.must_not are required")
    for kid in data.get("knowledge_ids") or []:
        if kid not in knowledge_ids:
            errors.append(f"{path}: unknown knowledge_ids entry {kid}")
    return errors


def main() -> int:
    knowledge_ids = load_knowledge_ids()
    cases = walk_yaml(ROOT / "evals/fixtures") + walk_yaml(ROOT / "evals/humanitas")
    if not cases:
        print("No eval fixtures found", file=sys.stderr)
        return 1
    errors: list[str] = []
    for path in cases:
        errors.extend(validate_case(path, knowledge_ids))
    print(f"Checked {len(cases)} eval cases against {len(knowledge_ids)} knowledge objects.")
    if errors:
        for err in errors:
            print(err, file=sys.stderr)
        return 1
    print("Eval fixtures are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
