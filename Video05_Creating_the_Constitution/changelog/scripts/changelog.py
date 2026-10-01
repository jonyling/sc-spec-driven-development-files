#!/usr/bin/env python3
"""Maintain CHANGELOG.md from git commit history."""

from __future__ import annotations

import subprocess
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path


def git_root() -> Path:
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        sys.exit("Not inside a git repository.")
    return Path(result.stdout.strip())


def git_log(since_date: str | None = None) -> dict[str, list[str]]:
    """Return commits as {date: [subject, ...]} newest-first within dates."""
    cmd = ["git", "log", "--format=%ad|%s", "--date=short"]
    if since_date:
        cmd.append(f"--after={since_date}")
    root = git_root()
    if Path.cwd().resolve() != root.resolve():
        cmd += ["--", "."]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    by_date: dict[str, list[str]] = defaultdict(list)
    for line in result.stdout.strip().splitlines():
        if "|" not in line:
            continue
        date, subject = line.split("|", 1)
        subject = subject.strip()
        if subject:
            by_date[date.strip()].append(subject)
    return by_date


def last_date_in_changelog(path: Path) -> str | None:
    for line in path.read_text().splitlines():
        if line.startswith("## "):
            candidate = line[3:].strip()
            try:
                datetime.strptime(candidate, "%Y-%m-%d")
                return candidate
            except ValueError:
                continue
    return None


def render_sections(by_date: dict[str, list[str]]) -> list[str]:
    lines: list[str] = []
    for date in sorted(by_date, reverse=True):
        lines.append(f"\n## {date}\n")
        for subject in by_date[date]:
            lines.append(f"- {subject}\n")
    return lines


def _norm(text: str) -> str:
    return text.strip().rstrip(".").strip()


def bullets_under_heading(lines: list[str], date: str) -> list[str]:
    heading = f"## {date}"
    in_section = False
    bullets: list[str] = []
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("## "):
            if in_section:
                break
            in_section = stripped == heading
            continue
        if in_section and stripped.startswith("- "):
            bullets.append(stripped[2:].strip())
    return bullets


def insert_bullets_under_heading(
    lines: list[str], date: str, subjects: list[str]
) -> None:
    heading = f"## {date}"
    for i, line in enumerate(lines):
        if line.strip() != heading:
            continue
        j = i + 1
        if j < len(lines) and lines[j].strip() == "":
            j += 1
        lines[j:j] = [f"- {subject}\n" for subject in subjects]
        return
    raise SystemExit(f"Missing changelog heading ## {date}")


def main() -> None:
    changelog = Path("CHANGELOG.md")

    if not changelog.exists():
        by_date = git_log()
        if not by_date:
            print("No commits found — nothing to write.")
            sys.exit(0)
        changelog.write_text("# Changelog\n" + "".join(render_sections(by_date)))
        total = sum(len(v) for v in by_date.values())
        print(
            f"Created CHANGELOG.md with {total} entries across {len(by_date)} date(s)."
        )
        return

    last = last_date_in_changelog(changelog)
    by_date = git_log(since_date=last)
    lines = changelog.read_text().splitlines(keepends=True)

    newer = {date: subjects for date, subjects in by_date.items() if last is None or date > last}
    same_day = by_date.get(last, []) if last else []
    already = {_norm(b) for b in bullets_under_heading(lines, last)} if last else set()
    new_same = [s for s in same_day if _norm(s) not in already]

    if not newer and not new_same:
        print("No new commits since last entry — CHANGELOG.md is up to date.")
        sys.exit(0)

    if new_same:
        insert_bullets_under_heading(lines, last, new_same)

    if newer:
        insert_at = 1 if lines and lines[0].startswith("# ") else 0
        lines[insert_at:insert_at] = render_sections(newer)

    changelog.write_text("".join(lines))
    total = sum(len(v) for v in newer.values()) + len(new_same)
    print(f"Added {total} new entries to CHANGELOG.md.")


if __name__ == "__main__":
    main()
