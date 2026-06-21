#!/usr/bin/env python3
"""Batch wire generated images: og:image meta + page hero visuals."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

VISUAL_BLOCK = """
<section class="df-section df-section--visual paper-grain">
  <div class="df-container">
    <figure class="df-page-visual reveal">
      <img src="{src}" alt="{alt}" width="1200" height="800" loading="lazy" decoding="async">
    </figure>
  </div>
</section>
"""

# path relative to site root -> (image src, alt, og image src optional)
PAGES: dict[str, tuple[str, str, str | None]] = {
    # services
    "services/pain.html": (
        "/images/services/pain-hero.png",
        "中醫針灸治療肩頸痛症",
        "/images/services/pain-hero.png",
    ),
    "services/skin.html": (
        "/images/services/skin-hero.png",
        "中醫皮膚調理與草本內調",
        "/images/services/skin-hero.png",
    ),
    "services/internal.html": (
        "/images/services/internal-hero.png",
        "中醫內科把脈診斷",
        "/images/services/internal-hero.png",
    ),
    "services/gynaecology.html": (
        "/images/services/gynaecology-hero.png",
        "中醫婦科溫灸調理",
        "/images/services/gynaecology-hero.png",
    ),
    "services/acupuncture.html": (
        "/images/services/acupuncture-hero.png",
        "中醫針灸毫針準備",
        "/images/services/acupuncture-hero.png",
    ),
    "services/herbs.html": (
        "/images/services/herbs-hero.png",
        "中藥材配方的傳統藥櫃",
        "/images/services/herbs-hero.png",
    ),
    "services/moxibustion.html": (
        "/images/services/moxibustion-hero.png",
        "艾灸療法溫經散寒",
        "/images/services/moxibustion-hero.png",
    ),
    "services/cupping.html": (
        "/images/services/cupping-hero.png",
        "拔罐療法經絡調理",
        "/images/services/cupping-hero.png",
    ),
    # conditions
    "conditions/eczema.html": (
        "/images/blog-eczema.png",
        "濕疹中醫內調飲食調理",
        "/images/blog-eczema.png",
    ),
    "conditions/acne.html": (
        "/images/blog-acne.png",
        "暗瘡中醫面部分區調理",
        "/images/blog-acne.png",
    ),
    "conditions/insomnia.html": (
        "/images/blog-insomnia.png",
        "失眠中醫安神調理",
        "/images/blog-insomnia.png",
    ),
    "conditions/fertility.html": (
        "/images/blog-fertility.png",
        "備孕中醫調理",
        "/images/blog-fertility.png",
    ),
    "conditions/neck-pain.html": (
        "/images/conditions/neck-pain.png",
        "頸肩痛辦公族舒緩",
        "/images/conditions/neck-pain.png",
    ),
    "conditions/sciatica.html": (
        "/images/conditions/sciatica.png",
        "坐骨神經痛伸展復健",
        "/images/conditions/sciatica.png",
    ),
    # blog
    "blog/eczema-from-within.html": (
        "/images/blog-eczema.png",
        "濕疹為何要從內調",
        "/images/blog-eczema.png",
    ),
    "blog/acne-face-zones.html": (
        "/images/blog-acne.png",
        "暗瘡位置與臟腑關係",
        "/images/blog-acne.png",
    ),
    "blog/insomnia-tcm-guide.html": (
        "/images/blog-insomnia.png",
        "失眠中醫分型調理",
        "/images/blog-insomnia.png",
    ),
    "blog/fertility-stress.html": (
        "/images/blog-fertility.png",
        "壓力型難孕體質調理",
        "/images/blog-fertility.png",
    ),
    "blog/index.html": (
        "/images/og/og-blog.png",
        "頤安本草養生專欄",
        "/images/og/og-blog.png",
    ),
}

OG_ONLY: dict[str, str] = {
    "about.html": "/images/og/og-default.png",
    "clinic.html": "/images/shop-8.jpeg",
    "contact.html": "/images/og/og-default.png",
    "faq.html": "/images/og/og-default.png",
    "services.html": "/images/og/og-default.png",
    "news/index.html": "/images/og/og-default.png",
    "news/saturday-hours-2026.html": "/images/og/og-default.png",
    "about/central-hk.html": "/images/og/og-default.png",
}

OG_RE = re.compile(
    r'<meta property="og:image" content="[^"]*">',
    re.IGNORECASE,
)


def set_og(html: str, og_url: str) -> str:
    full = f"https://oakvilles.com{og_url}"
    replacement = f'<meta property="og:image" content="{full}">'
    if OG_RE.search(html):
        return OG_RE.sub(replacement, html, count=1)
    return html


def insert_visual(html: str, src: str, alt: str) -> str:
    if "df-page-visual" in html:
        return html
    block = VISUAL_BLOCK.format(src=src, alt=alt)
    # after first df-page-hero section
    marker = re.search(
        r"(<section class=\"df-page-hero[^\"]*\"[\s\S]*?</section>\s*)",
        html,
        re.IGNORECASE,
    )
    if not marker:
        return html
    pos = marker.end()
    return html[:pos] + block + html[pos:]


def main() -> None:
    updated = 0
    for rel, (img, alt, og) in PAGES.items():
        path = ROOT / rel.replace("/", "\\") if "\\" not in rel else ROOT / rel
        path = ROOT / rel
        if not path.is_file():
            print("skip missing", rel)
            continue
        text = path.read_text(encoding="utf-8")
        new = set_og(text, og or img)
        new = insert_visual(new, img, alt)
        if new != text:
            path.write_text(new, encoding="utf-8")
            updated += 1
            print("updated", rel)

    for rel, og in OG_ONLY.items():
        path = ROOT / rel
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        new = set_og(text, og)
        if new != text:
            path.write_text(new, encoding="utf-8")
            updated += 1
            print("og only", rel)

    print(f"Done. {updated} files changed.")


if __name__ == "__main__":
    main()
