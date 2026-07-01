#!/usr/bin/env python3
"""Strip inline styles, unify lang tags, remove redundant bodyClass."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

REPLACEMENTS = [
    ('lang: "zh-Hant"', 'lang: "zh-HK"'),
    ('bodyClass: "lang-en"\n', ''),
    ('<span style="color:var(--cinnabar)">', '<span class="text-cin">'),
    ('<div class="rule-fade" style="margin:36px 0; max-width:24rem">', '<div class="rule-fade rule-fade--physician">'),
    ('<hr class="rule-fade" style="margin:32px 0;max-width:360px">', '<hr class="rule-fade rule-fade--about">'),
    ('<p class="df-home-eyebrow" style="text-align:center">', '<p class="df-home-eyebrow df-home-eyebrow--center">'),
    ('<div class="df-tags" style="justify-content:center">', '<div class="df-tags df-tags--center">'),
    ('<div class="df-container" style="position:relative">', '<div class="df-container df-container--rel">'),
    (
        '<p class="df-home-sub--center" style="margin:0;font-size:14px;color:var(--ink-faint)">',
        '<p class="df-home-sub--center df-home-sub--note">',
    ),
    ('<div class="df-divider" style="margin-bottom:28px">', '<div class="df-divider df-divider--booking">'),
    ('<h2 class="df-title" style="font-size:22px;margin-bottom:20px">', '<h2 class="df-title df-title--related">'),
    (
        '<p style="max-width:52ch;margin:16px auto 0;font-size:16px;line-height:1.9;color:var(--ink-soft)">',
        '<p class="df-lead df-lead--center-narrow">',
    ),
    (
        '<div class="df-tags reveal" data-d="1" style="justify-content:center;margin-top:28px">',
        '<div class="df-tags df-tags--center df-tags--spaced reveal" data-d="1">',
    ),
    (
        '<div class="df-head df-head--split reveal" style="margin-top:64px">',
        '<div class="df-head df-head--split df-head--spaced reveal">',
    ),
    (
        '<div class="df-principle-grid reveal" style="margin-top:36px">',
        '<div class="df-principle-grid df-principle-grid--spaced reveal">',
    ),
    (
        '<div style="display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:start">',
        '<div class="df-principle-lead">',
    ),
    ('<span class="df-principle__no" style="margin:0">', '<span class="df-principle__no df-principle__no--flush">'),
    (
        '<div class="df-card__cat" style="margin-top:20px;margin-bottom:10px">',
        '<div class="df-card__cat df-card__cat--stack">',
    ),
    (
        '<p class="df-lead reveal" style="text-align:center;margin:28px auto 0;max-width:600px">',
        '<p class="df-lead df-lead--center-wide reveal">',
    ),
    (
        '<p class="df-lead" style="max-width:340px;text-align:right;margin:0">',
        '<p class="df-lead df-lead--fees">',
    ),
    ('<div class="df-checks" style="margin-top:28px">', '<div class="df-checks df-checks--spaced">'),
    (
        '<h4 style="font-weight:700;font-size:16px;color:var(--pine);letter-spacing:.1em;margin:36px 0 16px">',
        '<h4 class="df-about-focus">',
    ),
    ('<div style="margin-top:32px">', '<div class="df-contact-hours-wrap">'),
    ('<div style="flex:1">', '<div class="df-contact-hours-body">'),
    ('<span style="color:var(--cinnabar)">休診</span>', '<span class="text-cin">休診</span>'),
    ('<span style="color:var(--cinnabar)">Closed</span>', '<span class="text-cin">Closed</span>'),
    ('<span style="font-size:13px;color:var(--ink-faint)">', '<span class="df-text-faint-sm">'),
    (
        'class="ink-link" style="display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:14px;color:var(--cinnabar)"',
        'class="ink-link df-map-link"',
    ),
    (
        'stroke="currentColor" stroke-width="2" style="width:16px;height:16px"',
        'stroke="currentColor" stroke-width="2" class="df-icon-sm"',
    ),
    (
        'class="df-btn df-btn--cinnabar df-btn--full df-btn--lg" style="margin-top:4px"',
        'class="df-btn df-btn--cinnabar df-btn--full df-btn--lg df-btn--stack"',
    ),
    (
        '<p style="font-size:12px;color:var(--ink-faint);text-align:center;margin-top:14px">',
        '<p class="df-form-note">',
    ),
    (
        'rel="noopener" style="color:var(--cinnabar)">WhatsApp',
        'rel="noopener" class="text-cin">WhatsApp',
    ),
    (
        'rel="noopener" style="color:var(--cinnabar)">WhatsApp 我們</a>',
        'rel="noopener" class="text-cin">WhatsApp 我們</a>',
    ),
]


def main() -> None:
    changed = 0
    for path in sorted(SRC.rglob("*.html")):
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            changed += 1
            print(path.relative_to(ROOT))
    print(f"\nUpdated {changed} files.")


if __name__ == "__main__":
    main()
