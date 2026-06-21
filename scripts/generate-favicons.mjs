#!/usr/bin/env node
/**
 * Generate favicon PNG/ICO assets from the brand seal (頤安本草).
 * Uses Puppeteer so Chinese glyphs render with Noto Serif TC.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "images");

const SIZES = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

const SEAL_HTML = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 512px; height: 512px;
    display: grid; place-items: center;
    background: transparent;
  }
  .seal {
    width: 480px; height: 480px;
    background: #A23A2E; color: #F3E6CF;
    display: grid; grid-template-columns: 1fr 1fr;
    place-items: center;
    border-radius: 36px;
    transform: rotate(-2deg);
    font-family: "Noto Serif TC", "Songti TC", serif;
    font-weight: 700;
    font-size: 168px;
    line-height: 1;
    position: relative;
    box-shadow: inset 0 0 0 12px rgba(243, 230, 207, 0.38);
  }
  .seal::after {
    content: "";
    position: absolute; inset: 24px;
    border-radius: 24px;
    border: 1px solid rgba(243, 230, 207, 0.2);
    pointer-events: none;
  }
  .seal span { padding: 8px; }
</style>
</head>
<body>
  <div class="seal" aria-hidden="true">
    <span>頤</span><span>安</span><span>本</span><span>草</span>
  </div>
</body>
</html>`;

async function renderMasterPng(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(SEAL_HTML, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  const buf = await page.screenshot({ type: "png", omitBackground: true });
  await page.close();
  return buf;
}

async function writeIco(png32Path, icoPath) {
  const png = await sharp(png32Path).png().toBuffer();
  const width = 32;
  const height = 32;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(width, 0);
  entry.writeUInt8(height, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  fs.writeFileSync(icoPath, Buffer.concat([header, entry, png]));
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  console.log("Rendering seal master PNG (512px)…");
  const browser = await puppeteer.launch({ headless: true });
  let master;
  try {
    master = await renderMasterPng(browser);
  } finally {
    await browser.close();
  }

  const masterPath = path.join(OUT, "_favicon-master.png");
  fs.writeFileSync(masterPath, master);

  for (const { name, size } of SIZES) {
    const outPath = path.join(OUT, name);
    await sharp(masterPath)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`  ${name}`);
  }

  const icoPath = path.join(OUT, "favicon.ico");
  await writeIco(path.join(OUT, "favicon-32x32.png"), icoPath);
  console.log("  favicon.ico");

  fs.unlinkSync(masterPath);
  console.log("Done → images/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
