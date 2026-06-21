#!/usr/bin/env python3
"""One-pass site polish: fonts, paths, inline styles → utility classes."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

OLD_FONT = (
    "family=Noto+Serif+TC:wght@200;300;400;500;600;700;900"
    "&family=Ma+Shan+Zheng"
    "&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400"
)
NEW_FONT = (
    "family=Noto+Serif+TC:wght@400;500;700"
    "&family=Ma+Shan+Zheng"
    "&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400"
)

REPLACEMENTS = [
    (OLD_FONT, NEW_FONT),
    (
        'class="df-btn df-btn--ghost df-btn--lg" style="color:var(--paper);border-color:rgba(247,242,231,.3)"',
        'class="df-btn df-btn--ghost df-btn--lg df-btn--ghost-on-dark"',
    ),
    (
        'class="df-title" style="font-size:clamp(1.5rem,3vw,2rem);margin-bottom:24px"',
        'class="df-title df-title--section"',
    ),
    (
        '<div class="df-trust reveal" style="margin-top:32px;padding:24px 28px;background:var(--paper-deep);border-radius:6px;border:1px solid var(--line-soft)">',
        '<div class="df-trust reveal">',
    ),
    (
        '<p style="font-size:15px;line-height:1.9;color:var(--ink-soft);margin:0">',
        '<p>',
    ),
    ('src="images/', 'src="/images/'),
    (
        'width="1200" height="800" loading="lazy" decoding="async">',
        'width="1920" height="823" loading="lazy" decoding="async">',
    ),
]

# Only bump df-page-visual hero dimensions (avoid process step images)
VISUAL_DIM_OLD = (
    '<figure class="df-page-visual reveal">\n      '
    '<img src="/images/'
)
# handled separately per file type - skip global 1200x800 on process

def polish_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    orig = text
    for old, new in REPLACEMENTS:
        if old == 'width="1200" height="800" loading="lazy" decoding="async">':
            continue
        text = text.replace(old, new)
    # df-page-visual banners only → 1920×823
    if "df-page-visual" in text and "process/step" not in text:
        text = text.replace(
            'width="1200" height="800" loading="lazy" decoding="async">',
            'width="1920" height="823" loading="lazy" decoding="async">',
        )
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main():
    changed = []
    for html in ROOT.rglob("*.html"):
        if ".claude" in str(html) or ".agents" in str(html):
            continue
        if polish_file(html):
            changed.append(html.relative_to(ROOT))
    print(f"Polished {len(changed)} files:")
    for p in changed:
        print(f"  {p}")


if __name__ == "__main__":
    main()
