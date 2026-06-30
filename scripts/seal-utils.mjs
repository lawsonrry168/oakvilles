import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LISHU_TTF = path.join(ROOT, "fonts/oakville-lishu.ttf");

/** Classic SIMLI 隶书 — same as seal PNGs */
export const SEAL_FONT_FAMILY = '"Oakville-Lishu", "LiSu", "STLiti", "隶书", serif';

export function sealFontCssForRender() {
  if (!fs.existsSync(LISHU_TTF)) return "";
  const ttf = LISHU_TTF.replace(/\\/g, "/");
  /* Puppeteer: embed SIMLI subset only — no local() so glyphs match web woff2 */
  return `@font-face{
    font-family:"Oakville-Lishu";
    src:url("file:///${ttf}") format("truetype");
    font-weight:400; font-style:normal;
  }`;
}

/** Render stack — Oakville-Lishu only (no serif fallback during rasterize) */
export const SEAL_RENDER_FONT = '"Oakville-Lishu", serif';

export const FILL = { r: 42, g: 58, b: 68 };
export const INK = { r: 235, g: 243, b: 247 };

function lerp(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

/** Brushed antique bronze — seal body */
function brushedMetal(x, y, minX, minY, maxX, maxY) {
  const bw = Math.max(maxX - minX + 1, 1);
  const bh = Math.max(maxY - minY + 1, 1);
  const nx = (x - minX) / bw;
  const ny = (y - minY) / bh;
  const grain =
    Math.sin(nx * 44 + ny * 6) * 0.034 +
    Math.sin(ny * 38 - nx * 12) * 0.026 +
    Math.sin((nx + ny) * 26) * 0.02;
  const t = Math.min(1, Math.max(0, nx * 0.56 + ny * 0.44 + grain));
  const shadow = { r: 82, g: 58, b: 36 };
  const base = { r: 128, g: 96, b: 62 };
  const hi = { r: 168, g: 128, b: 82 };
  if (t < 0.5) return lerp(shadow, base, t / 0.5);
  return lerp(base, hi, (t - 0.5) / 0.5);
}

/** Brushed highlight on carved characters — warm bronze-cream */
function brushedMetalInk(x, y, minX, minY, maxX, maxY) {
  const bw = Math.max(maxX - minX + 1, 1);
  const bh = Math.max(maxY - minY + 1, 1);
  const nx = (x - minX) / bw;
  const ny = (y - minY) / bh;
  const grain = Math.sin(nx * 52) * 0.022 + Math.sin(ny * 40) * 0.016;
  const t = Math.min(1, Math.max(0, nx * 0.48 + ny * 0.52 + grain + 0.05));
  const base = { r: 210, g: 186, b: 148 };
  const hi = { r: 232, g: 208, b: 168 };
  return lerp(base, hi, t);
}

export function lum(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

/** Yang seal PNG buffer → Yin metallic PNG file */
export async function yangToYin(input, outPath, size = 1024) {
  const { data, info } = await sharp(input)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ink = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      ink[y * w + x] = lum(data[i], data[i + 1], data[i + 2]) < 210 ? 1 : 0;
    }
  }

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (ink[y * w + x]) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  const pad = Math.round(size * 0.04);
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const inside = x >= minX && x <= maxX && y >= minY && y <= maxY;
      if (!inside) {
        out[i + 3] = 0;
        continue;
      }
      const color = ink[y * w + x]
        ? brushedMetalInk(x, y, minX, minY, maxX, maxY)
        : brushedMetal(x, y, minX, minY, maxX, maxY);
      out[i] = color.r;
      out[i + 1] = color.g;
      out[i + 2] = color.b;
      out[i + 3] = 255;
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

export function yangSealHtml(chars) {
  const cells = chars.map((c) => `<span>${c}</span>`).join("");
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<style>
${sealFontCssForRender()}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 512px; height: 512px;
    display: grid; place-items: center;
    background: transparent;
  }
  .yang-seal {
    width: 480px; height: 480px;
    background: #fff;
    border: 11px solid #4A1520;
    border-radius: 26px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    font-family: ${SEAL_RENDER_FONT};
    font-size: 480px;
    color: #4A1520;
    line-height: 1;
  }
  .yang-seal span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 0.34em;
    line-height: 1;
    transform: scaleX(1.06);
    text-align: center;
  }
</style>
</head>
<body>
  <div class="yang-seal" aria-hidden="true">${cells}</div>
</body>
</html>`;
}
