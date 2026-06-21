#!/usr/bin/env python3
"""Copy & rename Gemini/ChatGPT assets into images/ per 網站設計圖片prompt.md mapping."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    r"C:\Users\Steriod\.cursor\projects\c-Users-Steriod-Desktop-oakvilles\assets"
)
IMAGES = ROOT / "images"

# Gemini ID fragment -> list of destination paths (relative to images/)
MAPPING: dict[str, list[str]] = {
    # ── Process 6 steps (IMG-034–039) ──
    "t2m5z1t2m5z1t2m5": [
        "process/step-01-booking.png",
        "services/acupuncture-hero.png",
    ],
    "ldj3esldj3esldj3": [
        "process/step-02-checkin.png",
        "og/og-home.png",
    ],
    "vzqnrdvzqnrdvzqn": ["process/step-03-diagnosis.png"],
    "uvsmuquvsmuquvsm": ["process/step-04-plan.png"],
    "qjw4g2qjw4g2qjw4": ["process/step-05-treatment.png"],
    "ecvusaecvusaecvu": ["process/step-06-followup.png"],
    # ── Services heroes (IMG-020–027) ──
    "ytpnvsytpnvsytpn": ["services/pain-hero.png"],
    "9acpjd9acpjd9acp": ["services/skin-hero.png"],
    "hnwlcphnwlcphnwl": ["services/internal-hero.png"],
    "sb3ysqsb3ysqsb3y": ["services/gynaecology-hero.png"],
    "c2ub3rc2ub3rc2ub": ["services/herbs-hero.png"],
    "ld0cf9ld0cf9ld0c": ["services/moxibustion-hero.png"],
    "ep79jhep79jhep79": ["services/cupping-hero.png"],
    # ── Conditions (IMG-032–033) ──
    "f6g799f6g799f6g7": ["conditions/neck-pain.png"],
    "a79oy6a79oy6a79o": ["conditions/sciatica.png"],
    # ── Hero / OG ──
    "muwdfwmuwdfwmuwd": [
        "hero/hero-brand-zen.png",
        "og/og-default.png",
    ],
    "dbexy7dbexy7dbex": [
        "og/og-process.png",
        "og/og-blog.png",
    ],
    # ── Spares (descriptive names, for manual swap) ──
    "57w94d57w94d57w9": ["generated/consultation-seated.png"],
    "oqqbauoqqbauoqqb": ["generated/diagnosis-triptych.png"],
    "tzlvrxtzlvrxtzlv": ["generated/diagnosis-pulse-tongue-overlay.png"],
    "h0a1l7h0a1l7h0a1": ["generated/pulse-diagnosis-clinic.png"],
    "h13t89h13t89h13t": ["generated/pulse-diagnosis-banner.png"],
    "dv1h5udv1h5udv1h": ["generated/pulse-close-vertical.png"],
    "p9mtofp9mtofp9mt": ["generated/cupping-model-alt.png"],
    "g14qzsg14qzsg14q": ["generated/whatsapp-booking-alt.png"],
}

CHATGPT_MAP = {
    "ChatGPT_Image": ["hero/hero-moxibustion-bamboo.png", "services/moxibustion-hero-alt.png"],
}

MANIFEST_LINES: list[str] = []


def find_source(token: str) -> Path | None:
    for p in ASSETS.iterdir():
        if token in p.name and p.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"}:
            return p
    return None


def main() -> None:
    if not ASSETS.is_dir():
        raise SystemExit(f"Assets folder not found: {ASSETS}")

    copied = 0
    missing: list[str] = []

    all_maps: list[tuple[str, list[str]]] = list(MAPPING.items())
    for p in ASSETS.iterdir():
        if "ChatGPT_Image" in p.name:
            all_maps.append(("ChatGPT_Image", CHATGPT_MAP["ChatGPT_Image"]))
            break

    seen_dest: set[str] = set()
    for token, dests in all_maps:
        src = find_source(token)
        if src is None:
            missing.append(token)
            continue
        for rel in dests:
            if rel in seen_dest:
                continue
            seen_dest.add(rel)
            dest = IMAGES / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            copied += 1
            MANIFEST_LINES.append(f"| `{rel}` | `{src.name[:48]}…` | {token[:12]} |")

    # dv1h5u wide variant (__1_)
    for p in ASSETS.iterdir():
        if "dv1h5udv1h5udv1h" in p.name and "__1_" in p.name:
            rel = "generated/pulse-cabinet-wide.png"
            if rel not in seen_dest and p.is_file():
                dest = IMAGES / rel
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(p, dest)
                copied += 1
                MANIFEST_LINES.append(f"| `{rel}` | wide pulse banner | dv1h5u__1 |")
            break

    manifest = ROOT / "images" / "IMAGE-MANIFEST.md"
    manifest.write_text(
        "# 生成圖片對照表\n\n"
        "> 自動產生 · 對照 `網站設計圖片prompt.md`\n\n"
        "| 目標路徑 | 來源檔 | Gemini ID |\n"
        "|----------|--------|----------|\n"
        + "\n".join(MANIFEST_LINES)
        + f"\n\n共複製 **{copied}** 個檔案。\n",
        encoding="utf-8",
    )
    print(f"Copied {copied} files into {IMAGES}")
    if missing:
        print("Missing tokens:", ", ".join(missing))


if __name__ == "__main__":
    main()
