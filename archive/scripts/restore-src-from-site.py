#!/usr/bin/env python3
"""Restore src/*.html from last good _site/ build (UTF-8 safe)."""

from __future__ import annotations

import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_site"
SRC = ROOT / "src"

spec = importlib.util.spec_from_file_location(
    "migrate_eleventy", ROOT / "archive" / "scripts" / "migrate-eleventy.py"
)
migrate = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(migrate)

SKIP = {"conditions/central-hk.html"}


def simplify_picture(html: str) -> str:
    return re.sub(
        r"<picture>\s*<source[^>]*>\s*(<img[^>]+>)\s*</picture>",
        r"\1",
        html,
        flags=re.I,
    )


def restore() -> None:
    restored = 0
    for path in sorted(SITE.rglob("*.html")):
        rel = path.relative_to(SITE).as_posix()
        if rel in SKIP:
            continue
        html = path.read_text(encoding="utf-8")
        front_matter, content = migrate.build_front_matter(rel, html)
        content = simplify_picture(content)
        content = content.replace('class="df-trust reveal"', 'class="df-trust-note reveal"')
        dest = SRC / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(front_matter + content + "\n", encoding="utf-8")
        restored += 1
        print(f"  restored {rel}")
    print(f"\nDone: {restored} pages restored to src/")


if __name__ == "__main__":
    restore()
