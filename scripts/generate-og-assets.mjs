#!/usr/bin/env node
/**
 * Generate OG share images (1200×630 PNG) — brand lockup on paper canvas.
 * Usage: node scripts/generate-og-assets.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OG_DIR = path.join(ROOT, "images", "og");

const W = 1200;
const H = 630;

const bgSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="paper" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDF5F9"/>
      <stop offset="55%" stop-color="#E4EEF4"/>
      <stop offset="100%" stop-color="#D8E6EE"/>
    </linearGradient>
    <radialGradient id="wash" cx="18%" cy="22%" r="50%">
      <stop offset="0%" stop-color="#5A7A8C" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#5A7A8C" stop-opacity="0"/>
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
  <line x1="72" y1="574" x2="260" y2="574" stroke="#B8C5CE" stroke-width="1" opacity="0.75"/>
  <line x1="940" y1="574" x2="1128" y2="574" stroke="#B8C5CE" stroke-width="1" opacity="0.75"/>
  <path d="M56 56 H96 V76" fill="none" stroke="#B8C5CE" stroke-width="1.5" opacity="0.65"/>
  <path d="M1144 574 H1104 V554" fill="none" stroke="#B8C5CE" stroke-width="1.5" opacity="0.65"/>
  <rect x="599" y="92" width="2" height="26" fill="#5A7A8C" opacity="0.55"/>
</svg>`;

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function footerSvg(line1, line2) {
  const l1 = escapeXml(line1);
  const l2 = escapeXml(line2);
  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="544" text-anchor="middle" fill="#2A3A44"
    font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="6">${l1}</text>
  <text x="600" y="574" text-anchor="middle" fill="#5A6E7C"
    font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="2">${l2}</text>
</svg>`;
}

const VARIANTS = [
  {
    file: "og-default.png",
    line1: "OAKVILLE WELLNESS",
    line2: "Central Hong Kong · Registered TCM · Dr. Ng Hau Jun",
  },
  {
    file: "og-blog.png",
    line1: "WELLNESS JOURNAL",
    line2: "TCM Insights · Skin · Sleep · Fertility · Central HK",
  },
  {
    file: "og-process.png",
    line1: "PROCESS & FEES",
    line2: "Transparent Consultation Pricing · Oakville Wellness",
  },
];

async function renderVariant({ file, line1, line2 }) {
  const sealSize = 112;
  const logoWidth = 840;
  const out = path.join(OG_DIR, file);

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
      { input: Buffer.from(footerSvg(line1, line2)), top: 0, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`Wrote ${out} (${meta.width}×${meta.height}, png)`);
}

async function main() {
  for (const variant of VARIANTS) {
    await renderVariant(variant);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
