#!/usr/bin/env node
/**
 * Generate all Open Graph share images (1200×630).
 * Brand cards + hero overlays for services, conditions, and articles.
 * Usage: node scripts/generate-og-all.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG = path.join(ROOT, "images");
const OG = path.join(IMG, "og");

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
  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="544" text-anchor="middle" fill="#2A3A44"
    font-family="Georgia, 'Times New Roman', serif" font-size="15" letter-spacing="6">${escapeXml(line1)}</text>
  <text x="600" y="574" text-anchor="middle" fill="#5A6E7C"
    font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="2">${escapeXml(line2)}</text>
</svg>`;
}

function heroOverlaySvg(line1, line2) {
  return `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A2830" stop-opacity="0.12"/>
      <stop offset="45%" stop-color="#1A2830" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#1A2830" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#shade)"/>
  <line x1="72" y1="574" x2="260" y2="574" stroke="#D8E6EE" stroke-width="1" opacity="0.45"/>
  <line x1="940" y1="574" x2="1128" y2="574" stroke="#D8E6EE" stroke-width="1" opacity="0.45"/>
  <text x="600" y="528" text-anchor="middle" fill="#F4FAFC"
    font-family="Georgia, 'Times New Roman', serif" font-size="17" letter-spacing="5">${escapeXml(line1)}</text>
  <text x="600" y="562" text-anchor="middle" fill="#C5D4DC"
    font-family="Georgia, 'Times New Roman', serif" font-size="13" letter-spacing="2">${escapeXml(line2)}</text>
  <text x="600" y="598" text-anchor="middle" fill="#9BB0BC"
    font-family="Georgia, 'Times New Roman', serif" font-size="11" letter-spacing="3">OAKVILLE WELLNESS · CENTRAL HK</text>
</svg>`;
}

async function renderBrandCard({ file, line1, line2, format = "png" }) {
  const sealSize = 112;
  const logoWidth = 840;
  const out = path.join(OG, file);

  const [bg, seal, logoBuf] = await Promise.all([
    sharp(Buffer.from(bgSvg)).png().toBuffer(),
    sharp(path.join(IMG, "logo.svg")).resize(sealSize, sealSize).png().toBuffer(),
    sharp(path.join(IMG, "logo.png")).trim().resize(logoWidth).png().toBuffer(),
  ]);

  const logoMeta = await sharp(logoBuf).metadata();
  const gap = 26;
  const blockH = sealSize + gap + logoMeta.height;
  const startY = Math.round((H - blockH) / 2) - 16;

  let pipeline = sharp(bg).composite([
    { input: seal, top: startY, left: Math.round((W - sealSize) / 2) },
    { input: logoBuf, top: startY + sealSize + gap, left: Math.round((W - logoMeta.width) / 2) },
    { input: Buffer.from(footerSvg(line1, line2)), top: 0, left: 0 },
  ]);

  if (format === "jpeg") {
    await pipeline.jpeg({ quality: 91, mozjpeg: true }).toFile(out);
  } else {
    await pipeline.png({ compressionLevel: 9 }).toFile(out);
  }

  const meta = await sharp(out).metadata();
  console.log(`  brand  ${file} (${meta.width}×${meta.height})`);
}

async function renderHeroCard({ file, heroPath, line1, line2 }) {
  const out = path.join(OG, file);
  const heroFull = path.join(IMG, heroPath);
  if (!fs.existsSync(heroFull)) {
    console.warn(`  skip   ${file} — missing ${heroPath}`);
    return;
  }

  const sealSize = 72;
  const [hero, seal, overlay] = await Promise.all([
    sharp(heroFull).resize(W, H, { fit: "cover", position: "centre" }).jpeg({ quality: 88 }).toBuffer(),
    sharp(path.join(IMG, "logo.svg")).resize(sealSize, sealSize).png().toBuffer(),
    Buffer.from(heroOverlaySvg(line1, line2)),
  ]);

  await sharp(hero)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: seal, top: 36, left: 36 },
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`  hero   ${file} (${meta.width}×${meta.height})`);
}

const BRAND_CARDS = [
  { file: "og-default.png", line1: "OAKVILLE WELLNESS", line2: "Central Hong Kong · Registered TCM · Dr. Ng Hau Jun" },
  { file: "og-home-1200.jpg", line1: "OAKVILLE WELLNESS", line2: "Central Hong Kong · Registered TCM · Dr. Ng Hau Jun", format: "jpeg" },
  { file: "og-blog.png", line1: "WELLNESS JOURNAL", line2: "TCM Insights · Skin · Sleep · Fertility · Central HK" },
  { file: "og-process.png", line1: "PROCESS & FEES", line2: "Transparent Consultation Pricing · Oakville Wellness" },
  { file: "og-services.png", line1: "TCM SERVICES", line2: "Acupuncture · Dermatology · Pain · Internal Medicine" },
  { file: "og-about.png", line1: "ABOUT DR. NG", line2: "25 Years Clinical TCM · Registered CMP 003769" },
  { file: "og-clinic.png", line1: "CLINIC & LOCATION", line2: "Kam On Building · 6/F · Central · Hong Kong" },
  { file: "og-contact.png", line1: "CONTACT & BOOKING", line2: "WhatsApp 6734 9532 · Kam On Building Central" },
  { file: "og-news.png", line1: "NEWS & UPDATES", line2: "Clinic Hours · Announcements · Oakville Wellness" },
  { file: "og-faq.png", line1: "FREQUENTLY ASKED", line2: "TCM Consultation · Fees · Booking · Central HK" },
];

const HERO_CARDS = [
  { file: "og-svc-skin.jpg", hero: "services/skin-hero.png", line1: "TCM DERMATOLOGY", line2: "Acne · Eczema · Skin Wellness" },
  { file: "og-svc-acupuncture.jpg", hero: "services/acupuncture-hero.png", line1: "ACUPUNCTURE", line2: "Pain Relief · Wellness · Central HK" },
  { file: "og-svc-pain.jpg", hero: "services/pain-hero.png", line1: "PAIN MANAGEMENT", line2: "Neck · Back · Sciatica · Sports Injury" },
  { file: "og-svc-internal.jpg", hero: "services/internal-hero.png", line1: "INTERNAL MEDICINE", line2: "Digestion · Sleep · Chronic Conditions" },
  { file: "og-svc-gynaecology.jpg", hero: "services/gynaecology-hero.png", line1: "GYNAECOLOGY & FERTILITY", line2: "Women's Health · IVF Support · TCM" },
  { file: "og-svc-herbs.jpg", hero: "services/herbs-hero.png", line1: "HERBAL MEDICINE", line2: "Personalised Formulas · TCM Pharmacy" },
  { file: "og-svc-cupping.jpg", hero: "services/cupping-hero.png", line1: "CUPPING THERAPY", line2: "Muscle Tension · Circulation · Recovery" },
  { file: "og-svc-moxibustion.jpg", hero: "services/moxibustion-hero.png", line1: "MOXIBUSTION", line2: "Warmth Therapy · Qi · Immunity Support" },
  { file: "og-cond-acne.jpg", hero: "conditions/acne.png", line1: "ACNE & SKIN", line2: "Face Mapping · TCM Dermatology · Central" },
  { file: "og-cond-eczema.jpg", hero: "blog-eczema.png", line1: "ECZEMA & DERMATITIS", line2: "Root-Cause TCM · Skin Wellness" },
  { file: "og-cond-insomnia.jpg", hero: "blog-insomnia.png", line1: "INSOMNIA & SLEEP", line2: "TCM Sleep Wellness · Central Hong Kong" },
  { file: "og-cond-fertility.jpg", hero: "blog-fertility.png", line1: "FERTILITY SUPPORT", line2: "Stress · Hormones · IVF · TCM" },
  { file: "og-cond-sciatica.jpg", hero: "conditions/sciatica.png", line1: "SCIATICA & NERVE PAIN", line2: "Acupuncture · Pain Relief · Central" },
  { file: "og-cond-neck-pain.jpg", hero: "conditions/neck-pain.png", line1: "NECK & SHOULDER PAIN", line2: "Office Strain · TCM · Acupuncture" },
  { file: "og-article-acne.jpg", hero: "blog-acne.png", line1: "ACNE FACE ZONES", line2: "TCM Skin Insights · Wellness Journal" },
  { file: "og-article-eczema.jpg", hero: "blog-eczema.png", line1: "ECZEMA FROM WITHIN", line2: "Root-Cause TCM · Wellness Journal" },
  { file: "og-article-insomnia.jpg", hero: "blog-insomnia.png", line1: "INSOMNIA GUIDE", line2: "Sleep & TCM · Wellness Journal" },
  { file: "og-article-fertility.jpg", hero: "blog-fertility.png", line1: "FERTILITY & STRESS", line2: "TCM Insights · Wellness Journal" },
];

async function main() {
  fs.mkdirSync(OG, { recursive: true });
  console.log("Generating OG brand cards…");
  for (const card of BRAND_CARDS) {
    await renderBrandCard(card);
  }
  console.log("Generating OG hero overlays…");
  for (const card of HERO_CARDS) {
    await renderHeroCard({ file: card.file, heroPath: card.hero, line1: card.line1, line2: card.line2 });
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
