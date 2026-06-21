#!/usr/bin/env python3
"""Batch-enhance src/*.html front matter for SEO / GEO / Open Graph."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src"

GEO_SUFFIX = " · 香港中環 · 伍厚臻中醫師"

PAGE_META: dict[str, dict] = {
    "index.html": {
        "priority": "1.0",
        "changefreq": "weekly",
        "keywords": "中環中醫,香港中醫,伍厚臻中醫師,頤安本草,中環中醫診所,皮膚中醫,婦科中醫,痛症針灸",
        "ogImageAlt": "頤安本草 · 伍厚臻中醫師 — 香港中環高端中醫診所",
    },
    "about.html": {
        "priority": "0.9",
        "changefreq": "monthly",
        "keywords": "伍厚臻中醫師,註冊中醫003769,中環中醫,頤安本草,皮膚中醫,婦科中醫",
        "ogImageAlt": "伍厚臻中醫師 — 25年香港中環中醫臨床經驗",
    },
    "about/central-hk.html": {
        "priority": "0.95",
        "changefreq": "monthly",
        "keywords": "中環中醫診所,中環中醫,香港中環中醫,錦安大廈中醫,伍厚臻,頤安本草",
        "ogImage": "https://oakvilles.com/images/og/og-home.png",
        "ogImageAlt": "中環中醫診所頤安本草 — 皇后大道中錦安大廈",
        "ogDescription": "香港中環伍厚臻中醫診所，位於皇后大道中錦安大廈 6 樓。皮膚、痛症、婦科、針灸 · WhatsApp 6734 9532 預約。",
    },
    "contact.html": {
        "priority": "0.9",
        "changefreq": "monthly",
        "keywords": "中環中醫預約,WhatsApp預約中醫,伍厚臻聯絡,頤安本草地址",
        "ogImageAlt": "聯絡頤安本草中環中醫診所 — 預約伍厚臻中醫師",
        "ogDescription": "預約伍厚臻中醫師：WhatsApp 6734 9532 · 電話 2881 8182。中環錦安大廈 6 樓，一至五及週六應診。",
    },
    "clinic.html": {
        "priority": "0.8",
        "changefreq": "monthly",
        "keywords": "中環中醫診所環境,頤安本草診所,錦安大廈中醫",
        "ogImageAlt": "頤安本草中環中醫診所環境實景",
    },
    "services.html": {
        "priority": "0.9",
        "changefreq": "monthly",
        "keywords": "中環中醫專科,痛症中醫,皮膚中醫,婦科中醫,針灸香港",
        "ogImageAlt": "頤安本草診症專科 — 中環中醫全面服務",
    },
    "process.html": {
        "priority": "0.8",
        "changefreq": "monthly",
        "keywords": "中醫診症流程,中環中醫收費,首次應診",
        "ogImageAlt": "伍厚臻中醫師診症流程與收費",
    },
    "faq.html": {
        "priority": "0.8",
        "changefreq": "monthly",
        "keywords": "中醫常見問題,針灸痛嗎,中藥副作用,中環中醫FAQ",
        "ogImageAlt": "中醫診症常見問題 — 頤安本草",
    },
    "blog/index.html": {
        "priority": "0.8",
        "changefreq": "weekly",
        "keywords": "中醫養生專欄,濕疹中醫,暗瘡中醫,失眠中醫,備孕中醫",
        "ogImageAlt": "頤安本草養生專欄 — 伍厚臻中醫師",
    },
    "news/index.html": {
        "priority": "0.7",
        "changefreq": "weekly",
        "keywords": "頤安本草最新消息,中環中醫公告",
        "ogImageAlt": "頤安本草中環中醫診所最新消息",
    },
    "news/saturday-hours-2026.html": {
        "priority": "0.6",
        "changefreq": "yearly",
        "lastmod": "2026-01-15",
        "keywords": "週六中醫,中環中醫應診時間",
        "ogImageAlt": "2026 週六應診時間 — 頤安本草",
        "ogType": "article",
        "articlePublishedTime": "2026-01-15T09:00:00+08:00",
        "articleSection": "最新消息",
    },
}

BLOG_ARTICLES = {
    "blog/eczema-from-within.html": {
        "articlePublishedTime": "2026-02-10T10:00:00+08:00",
        "articleSection": "養生專欄",
        "articleTags": ["濕疹", "中醫內調", "皮膚"],
        "keywords": "濕疹中醫,濕疹內調,香港中環中醫,伍厚臻",
    },
    "blog/acne-face-zones.html": {
        "articlePublishedTime": "2026-02-18T10:00:00+08:00",
        "articleSection": "養生專欄",
        "articleTags": ["暗瘡", "面部分區", "臟腑"],
        "keywords": "暗瘡中醫,暗瘡位置,中環皮膚中醫",
    },
    "blog/insomnia-tcm-guide.html": {
        "articlePublishedTime": "2026-03-05T10:00:00+08:00",
        "articleSection": "養生專欄",
        "articleTags": ["失眠", "中醫分型", "心腎不交"],
        "keywords": "失眠中醫,中環中醫,心腎不交,肝鬱化火",
    },
    "blog/fertility-stress.html": {
        "articlePublishedTime": "2026-03-12T10:00:00+08:00",
        "articleSection": "養生專欄",
        "articleTags": ["備孕", "不孕", "壓力"],
        "keywords": "備孕中醫,不孕調理,中環婦科中醫",
    },
}

CONDITIONS = {
    "conditions/eczema.html": ("濕疹中醫,中環濕疹,濕疹調理香港", "濕疹中醫治療 — 香港中環"),
    "conditions/acne.html": ("暗瘡中醫,中環暗瘡,暗瘡調理", "暗瘡中醫治療 — 香港中環"),
    "conditions/insomnia.html": ("失眠中醫,中環失眠調理", "失眠中醫調理 — 香港中環"),
    "conditions/fertility.html": ("不孕中醫,備孕調理,中環婦科", "不孕備孕中醫 — 香港中環"),
    "conditions/neck-pain.html": ("頸痛中醫,頸椎痛,中環針灸", "頸痛中醫治療 — 香港中環"),
    "conditions/sciatica.html": ("坐骨神經痛中醫,腰背痛,中環痛症", "坐骨神經痛中醫 — 香港中環"),
}

SERVICES = {
    "services/pain.html": ("痛症中醫,頸痛,腰背痛,中環針灸", "中醫痛症治療"),
    "services/skin.html": ("皮膚中醫,暗瘡,濕疹,中環皮膚科", "中醫皮膚科"),
    "services/internal.html": ("內科中醫,失眠,腸胃,中環", "中醫內科調理"),
    "services/gynaecology.html": ("婦科中醫,月經,備孕,中環", "中醫婦科調理"),
    "services/acupuncture.html": ("針灸,中環針灸,美顏針", "針灸療法"),
    "services/herbs.html": ("中藥處方,一人一方,中環中醫", "中藥處方"),
    "services/moxibustion.html": ("艾灸,中環中醫", "艾灸療法"),
    "services/cupping.html": ("拔罐,刮痧,中環中醫", "拔罐刮痧"),
}


def parse_front_matter(text: str) -> tuple[dict[str, str], str, str]:
    if not text.startswith("---"):
        return {}, text, ""
    end = text.index("---", 3)
    fm_block = text[3:end].strip()
    rest = text[end + 3 :]
    fields: dict[str, str] = {}
    current_key = None
    current_lines: list[str] = []
    for line in fm_block.splitlines():
        if line.startswith("  ") and current_key:
            current_lines.append(line[2:])
            continue
        if current_key:
            fields[current_key] = "\n".join(current_lines)
        m = re.match(r"^(\w+):\s*(.*)$", line)
        if m:
            current_key = m.group(1)
            val = m.group(2).strip()
            if val == "|":
                current_lines = []
            else:
                current_lines = [val.strip('"')]
        else:
            current_key = None
    if current_key:
        fields[current_key] = "\n".join(current_lines)
    return fields, rest, fm_block


def format_front_matter(fields: dict[str, str]) -> str:
    order = [
        "layout", "homeNav", "stickyCta", "homeJs", "title", "description", "canonical",
        "keywords", "priority", "changefreq", "lastmod",
        "ogTitle", "ogDescription", "ogUrl", "ogImage", "ogImageAlt", "ogImageWidth", "ogImageHeight",
        "ogType", "articlePublishedTime", "articleModifiedTime", "articleSection", "articleTags",
        "lang", "bodyClass", "extraCss", "schema", "noindex",
    ]
    lines = ["---"]
    seen = set()
    for key in order:
        if key not in fields:
            continue
        seen.add(key)
        val = fields[key]
        if key == "schema":
            lines.append("schema: |")
            for sl in val.splitlines():
                lines.append(f"  {sl}")
        elif key == "articleTags":
            lines.append("articleTags:")
            tags = val if isinstance(val, list) else [t.strip() for t in str(val).split(",")]
            for tag in tags:
                lines.append(f'  - "{tag}"')
        elif key in ("homeNav", "stickyCta", "homeJs", "noindex") and val in ("true", "false", True, False):
            lines.append(f"{key}: {str(val).lower()}")
        elif "\n" in val:
            lines.append(f"{key}: |")
            for sl in val.splitlines():
                lines.append(f"  {sl}")
        else:
            escaped = val.replace('"', '\\"')
            lines.append(f'{key}: "{escaped}"')
    for key, val in fields.items():
        if key in seen:
            continue
        escaped = val.replace('"', '\\"')
        lines.append(f'{key}: "{escaped}"')
    lines.append("---")
    return "\n".join(lines) + "\n"


def set_field(fields: dict[str, str], key: str, value: str) -> None:
    if key not in fields or not fields[key].strip():
        fields[key] = value


def enhance_file(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix()
    text = path.read_text(encoding="utf-8")
    fields, body, _ = parse_front_matter(text)
    if not fields:
        return False

    changed = False
    meta = dict(PAGE_META.get(rel, {}))
    if rel in BLOG_ARTICLES:
        meta.update(BLOG_ARTICLES[rel])
        meta.setdefault("ogType", "article")
        meta.setdefault("priority", "0.7")
        meta.setdefault("changefreq", "monthly")
        title = fields.get("title", "")
        meta.setdefault("ogImageAlt", title.split("|")[0].strip())
    elif rel.startswith("blog/") and rel != "blog/index.html":
        meta.setdefault("ogType", "article")
    elif rel in CONDITIONS:
        kw, alt = CONDITIONS[rel]
        meta.setdefault("keywords", kw)
        meta.setdefault("ogImageAlt", alt)
        meta.setdefault("priority", "0.85")
        meta.setdefault("changefreq", "monthly")
        if "中環" not in fields.get("description", ""):
            desc = fields.get("description", "").rstrip(".")
            fields["description"] = desc + " · 香港中環面診。"
            fields["ogDescription"] = fields["description"]
            changed = True
    elif rel in SERVICES:
        kw, alt = SERVICES[rel]
        meta.setdefault("keywords", kw + ",中環中醫")
        meta.setdefault("ogImageAlt", alt + " — 伍厚臻中醫師 · 中環")
        meta.setdefault("priority", "0.8")
        meta.setdefault("changefreq", "monthly")

    for key, val in meta.items():
        if key == "articleTags":
            if isinstance(val, list):
                fields[key] = val  # YAML list via custom format
            changed = True
        elif key not in fields or (key in ("ogDescription", "ogImage", "ogType") and fields.get(key) != str(val)):
            if key in fields and fields[key] and key not in ("ogDescription", "ogImage", "ogType"):
                continue
            fields[key] = str(val)
            changed = True

    if "ogImageAlt" not in fields and fields.get("title"):
        fields["ogImageAlt"] = fields["title"].split("|")[0].strip()
        changed = True

    if rel.startswith("blog/") and fields.get("ogType") == "website":
        fields["ogType"] = "article"
        changed = True

    if changed or meta:
        path.write_text(format_front_matter(fields) + body.lstrip("\n"), encoding="utf-8")
        print(f"  ok {rel}")
        return True
    return False


def main() -> None:
    count = 0
    for path in sorted(ROOT.rglob("*.html")):
        if enhance_file(path):
            count += 1
    print(f"\nEnhanced {count} pages.")


if __name__ == "__main__":
    main()
