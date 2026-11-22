#!/usr/bin/env python3
"""Single-trunk branch promotion gate.

This repository publishes one artifact from ``main`` with no ``staged``/``dev``
ladder, so the org's forward promotion route (feature -> dev -> staged -> main)
and its Mainnet Acceptance Evidence Pack cannot apply. Rather than leave the
repository ungated, this enforces the narrower rule the org policy records for
single-trunk repositories:

* the PR must come from this repository, not a fork;
* the head must be an ordinary work branch (never a trunk branch or a
  ``promotion/`` candidate, which do not exist here);
* the PR body must carry the Feature -> dev promotion checklist, so the change
  is still described and reviewed rather than pushed straight to ``main``.

The allowlist and this rule live in ``conxian-business``'s
``scripts/branch_promotion_policy.py`` (``SINGLE_TRUNK_REPOS``); this script is
the enforcement copy for a repository that does not carry that module.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

WORK_BRANCH_RE = re.compile(
    r"^(?:feat(?:ure)?|fix|docs|chore|hotfix|dependabot|infra|ops|ci|security|proof|agent|openhands)/"
    r"[A-Za-z0-9._/-]+$"
)
TRUNK_HEADS = frozenset({"main", "master", "staged", "dev"})
CHECKLIST_RE = re.compile(
    r"(?:PROMOTION:FEATURE->DEV|^###\s+Feature\s*->\s*dev\s+promotion\s+checklist\b)",
    re.IGNORECASE | re.MULTILINE,
)


def validate(pr: dict, repository: str) -> list[str]:
    head_ref = pr.get("head", {}).get("ref", "")
    head_repo = (pr.get("head", {}).get("repo") or {}).get("full_name")
    body = pr.get("body") or ""
    actor = (pr.get("user") or {}).get("login", "")

    errors: list[str] = []
    if not head_repo or head_repo.lower() != repository.lower():
        errors.append("PRs must come from this repository, not a fork.")
    if head_ref in TRUNK_HEADS or head_ref.startswith("promotion/"):
        errors.append(
            "PRs must come from an ordinary work branch; trunk and promotion branches "
            "are not valid heads in a single-trunk repository."
        )
    elif not WORK_BRANCH_RE.fullmatch(head_ref):
        errors.append(
            "PRs must use feat/, feature/, fix/, docs/, chore/, hotfix/, dependabot/, "
            "infra/, ops/, ci/, security/, proof/, agent/, or openhands/ branch names."
        )
    if actor != "dependabot[bot]" and not head_ref.startswith("dependabot/"):
        if not CHECKLIST_RE.search(body):
            errors.append("PRs must include the Feature -> dev promotion checklist.")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--event-path", type=Path, required=True)
    args = parser.parse_args()

    event = json.loads(args.event_path.read_text(encoding="utf-8"))
    pr = event["pull_request"]
    repository = (
        pr.get("base", {}).get("repo", {}).get("full_name")
        or event.get("repository", {}).get("full_name")
        or ""
    )
    errors = validate(pr, repository)
    print(f"Single-trunk promotion check: {repository} PR #{pr.get('number')} head={pr['head']['ref']}")
    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print("Route and checklist accepted.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
