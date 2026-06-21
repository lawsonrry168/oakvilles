#!/usr/bin/env python3
"""One-time: migrate root HTML pages into Eleventy src/ templates."""

from __future__ import annotations

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

SKIP_DIRS = {"fragments", "src", "_site", "node_modules", "archive", "css", "js", "images", "scripts", ".git"}
SKIP_FILES = set()

REDIRECT_PAGES = {
    "conditions/central-hk.html": {
        "layout": "layouts/redirect.njk",
        "title": "頁面已移動 · 中環中醫診所",
        "canonical": "https://oakvilles.com/about/central-hk.html",
        "redirectTo": "/about/central-hk.html",
        "redirectLabel": "中環中醫診所 · 關於我們",
    }
}


def meta_content(html: str, name: str) -> str | None:
    m = re.search(
        rf'<meta\s+(?:name|property)="{re.escape(name)}"\s+content="([^"]*)"',
        html,
        re.I,
    )
    return m.group(1) if m else None


def link_canonical(html: str) -> str | None:
    m = re.search(r'<link\s+rel="canonical"\s+href="([^"]+)"', html, re.I)
    return m.group(1) if m else None


def title_text(html: str) -> str | None:
    m = re.search(r"<title>([^<]+)</title>", html, re.I)
    return m.group(1).strip() if m else None


def lang_attr(html: str) -> str:
    m = re.search(r'<html\s+lang="([^"]+)"', html, re.I)
    return m.group(1) if m else "zh-HK"


def body_class(html: str) -> str | None:
    m = re.search(r"<body\s+class=\"([^\"]+)\"", html, re.I)
    return m.group(1) if m else None


def schema_json(html: str) -> str | None:
    m = re.search(
        r'<script\s+type="application/ld\+json">\s*(.*?)\s*</script>',
        html,
        re.I | re.S,
    )
    return m.group(1).strip() if m else None


def strip_chrome(html: str) -> str:
    html = re.sub(
        r"<!--[^\n]*NAV[^\n]*-->\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<header\s+class=\"df-nav[\s\S]*?</header>\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<!--[^\n]*FOOTER[^\n]*-->\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<footer\s+class=\"df-footer[\s\S]*?</footer>\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<div\s+class=\"df-sticky-cta\"[\s\S]*?</div>\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<a[^>]+class=\"df-wa-float\"[\s\S]*?</a>\s*",
        "",
        html,
        flags=re.I,
    )
    html = re.sub(
        r"<script\s+src=\"(?:\.\./)?js/[^\"]+\"></script>\s*",
        "",
        html,
        flags=re.I,
    )
    return html.strip()


def extract_body_inner(html: str) -> str:
    m = re.search(r"<body[^>]*>([\s\S]*)</body>", html, re.I)
    if not m:
        return html
    return strip_chrome(m.group(1))


def yaml_quote(value: str) -> str:
    if not value:
        return '""'
    if "\n" in value or ":" in value or '"' in value:
        escaped = value.replace('"', '\\"')
        return f'"{escaped}"'
    return f'"{value}"'


def build_front_matter(rel: str, html: str) -> tuple[str, str]:
    if rel in REDIRECT_PAGES:
        cfg = REDIRECT_PAGES[rel]
        fm = ["---"]
        for k, v in cfg.items():
            fm.append(f"{k}: {yaml_quote(v)}")
        fm.append("---")
        return "\n".join(fm) + "\n", ""

    is_home = rel == "index.html"
    title = title_text(html) or "頤安本草"
    description = meta_content(html, "description")
    canonical = link_canonical(html) or ""
    og_title = meta_content(html, "og:title") or title
    og_desc = meta_content(html, "og:description") or description or ""
    og_url = meta_content(html, "og:url") or canonical
    og_image = meta_content(html, "og:image") or ""
    og_type = meta_content(html, "og:type") or "website"
    lang = lang_attr(html)
    body_class_val = body_class(html)
    schema = schema_json(html)
    has_home_css = "home.css" in html

    fm = ["---", "layout: layouts/base.njk"]
    if is_home:
        fm.extend(
            [
                "homeNav: true",
                "stickyCta: true",
                "homeJs: true",
                "sitemap: true",
            ]
        )
    fm.append(f"title: {yaml_quote(title)}")
    if description:
        fm.append(f"description: {yaml_quote(description)}")
    if canonical:
        fm.append(f"canonical: {yaml_quote(canonical)}")
    fm.append(f"ogTitle: {yaml_quote(og_title)}")
    fm.append(f"ogDescription: {yaml_quote(og_desc)}")
    if og_url:
        fm.append(f"ogUrl: {yaml_quote(og_url)}")
    if og_image:
        fm.append(f"ogImage: {yaml_quote(og_image)}")
    fm.append(f"ogType: {yaml_quote(og_type)}")
    if lang != "zh-HK":
        fm.append(f"lang: {yaml_quote(lang)}")
    if body_class_val:
        fm.append(f"bodyClass: {yaml_quote(body_class_val)}")
    if has_home_css:
        fm.append("extraCss: home.css")
    if schema:
        fm.append("schema: |")
        for line in schema.splitlines():
            fm.append(f"  {line}")
    fm.append("---")

    content = extract_body_inner(html)
    return "\n".join(fm) + "\n", content


def iter_html_files() -> list[Path]:
    files: list[Path] = []
    for path in sorted(ROOT.rglob("*.html")):
        rel_parts = path.relative_to(ROOT).parts
        if rel_parts[0] in SKIP_DIRS:
            continue
        if path.name in SKIP_FILES:
            continue
        files.append(path)
    return files


def migrate() -> None:
    if SRC.exists():
        shutil.rmtree(SRC / "_pages_tmp", ignore_errors=True)
    includes = SRC / "_includes"
    includes.mkdir(parents=True, exist_ok=True)

    migrated = 0
    for path in iter_html_files():
        rel = path.relative_to(ROOT).as_posix()
        html = path.read_text(encoding="utf-8")
        front_matter, content = build_front_matter(rel, html)
        dest = SRC / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(front_matter + content + "\n", encoding="utf-8")
        migrated += 1
        print(f"  migrated {rel}")

    print(f"\nDone: {migrated} pages → src/")


if __name__ == "__main__":
    migrate()
