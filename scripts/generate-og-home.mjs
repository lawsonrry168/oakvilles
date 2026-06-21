#!/usr/bin/env node
/**
 * Generate homepage OG share image (1200×630) — brand logo lockup on paper canvas.
 * Usage: node scripts/generate-og-home.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "images", "og", "og-home-1200.jpg");

const W = 1200;
const H = 630;

const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="paper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2"/>
      <stop offset="55%" stop-color="#F7F2E7"/>
      <stop offset="100%" stop-color="#EFE7D6"/>
    </linearGradient>
    <radialGradient id="wash" cx="18%" cy="22%" r="50%">
      <stop offset="0%" stop-color="#2A463C" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#2A463C" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.035"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#paper)"/>
  <rect width="100%" height="100%" fill="url(#wash)"/>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.45"/>
  <line x1="72" y1="574" x2="260" y2="574" stroke="#AE8A47" stroke-width="1" opacity="0.55"/>
  <line x1="940" y1="574" x2="1128" y2="574" stroke="#AE8A47" stroke-width="1" opacity="0.55"/>
  <path d="M56 56 H96 V76" fill="none" stroke="#AE8A47" stroke-width="1.5" opacity="0.5"/>
  <path d="M1144 574 H1104 V554" fill="none" stroke="#AE8A47" stroke-width="1.5" opacity="0.5"/>
  <rect x="599" y="92" width="2" height="26" fill="#AE8A47" opacity="0.65"/>
</svg>`;

const footerSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="544" text-anchor="middle" fill="#2A463C"
    font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="6">OAKVILLE WELLNESS</text>
  <text x="600" y="574" text-anchor="middle" fill="#8A8273"
    font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="2">Central Hong Kong · Registered TCM · Dr. Ng Hau Chun</text>
</svg>`;

async function main() {
  const sealSize = 112;
  const logoWidth = 840;

  const [bg, seal, logoBuf] = await Promise.all([
    sharp(Buffer.from(bgSvg)).png().toBuffer(),
    sharp(path.join(ROOT, "images", "logo.svg")).resize(sealSize, sealSize).png().toBuffer(),
    sharp(path.join(ROOT, "images", "logo.png")).trim().resize(logoWidth).png().toBuffer(),
  ]);

  const logoMeta = await sharp(logoBuf).metadata();
  const gap = 26;
  const blockH = sealSize + gap + logoMeta.height;
  const startY = Math.round((H - blockH) / 2) - 16;

  await sharp(bg)
    .composite([
      { input: seal, top: startY, left: Math.round((W - sealSize) / 2) },
      {
        input: logoBuf,
        top: startY + sealSize + gap,
        left: Math.round((W - logoMeta.width) / 2),
      },
      { input: Buffer.from(footerSvg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 91, mozjpeg: true })
    .toFile(OUT);

  const out = await sharp(OUT).metadata();
  console.log(`Wrote ${OUT} (${out.width}×${out.height}, jpeg)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
