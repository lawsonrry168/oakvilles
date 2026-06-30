#!/usr/bin/env node
/** 頤安本草 Hero 水印 — 隸書參考圖 → 香檳金褐透明 PNG */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "images/logo-seal-lishu-source.png");
const OUT = path.join(ROOT, "images/hero-yi-an-ben-cao-wm.png");

const GOLD = { r: 197, g: 179, b: 144 };

function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Missing", SRC);
    process.exit(1);
  }

  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const out = Buffer.alloc(w * h * 4);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const L = lum(data[i], data[i + 1], data[i + 2]);
      if (L < 215) {
        const t = Math.min(1, (215 - L) / 115);
        out[i] = GOLD.r;
        out[i + 1] = GOLD.g;
        out[i + 2] = GOLD.b;
        out[i + 3] = Math.round(t * 255);
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log("Hero watermark → images/hero-yi-an-ben-cao-wm.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
