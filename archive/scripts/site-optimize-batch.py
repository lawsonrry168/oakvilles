#!/usr/bin/env python3
"""Batch site optimizations: remove duplicate scripts, fix breadcrumbs."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

SCRIPT_BLOCK = re.compile(
    r"\n*<script src=\"/js/site-config\.js\"></script>\s*"
    r"<script src=\"/js/schema-manifest\.js\"></script>\s*"
    r"(?:<script src=\"/js/search-index-en\.js\"></script>|"
    r"<script src=\"/js/search-index\.js\"></script>)\s*"
    r"<script src=\"/js/dongfang\.js\"></script>\s*"
    r"(?:<script src=\"/js/home\.js\"></script>\s*)?",
    re.MULTILINE,
)

BREADCRUMB_EMPTY = re.compile(
    r'<a href="/"></a>',
)


def strip_scripts(text: str) -> tuple[str, bool]:
    new, n = SCRIPT_BLOCK.subn("\n", text)
    return new.rstrip() + "\n", n > 0


def fix_breadcrumb(text: str) -> tuple[str, bool]:
    repl = '{% include "breadcrumb-home-link.njk" %}'
    new, n = BREADCRUMB_EMPTY.subn(repl, text)
    return new, n > 0


def main() -> None:
    script_count = 0
    crumb_count = 0
    for path in sorted(SRC.rglob("*.html")):
        if path.parts[-2:] == ("_includes",):
            continue
        original = path.read_text(encoding="utf-8", errors="strict")
        text = original
        text, s = strip_scripts(text)
        text, c = fix_breadcrumb(text)
        if text != original:
            path.write_text(text, encoding="utf-8")
            if s:
                script_count += 1
                print(f"scripts: {path.relative_to(ROOT)}")
            if c:
                crumb_count += 1
                print(f"breadcrumb: {path.relative_to(ROOT)}")
    print(f"\nDone. scripts stripped: {script_count}, breadcrumbs fixed: {crumb_count}")


if __name__ == "__main__":
    main()
