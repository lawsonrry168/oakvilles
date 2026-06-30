#!/usr/bin/env node
/**
 * Generate favicon PNG/ICO assets from the brand seal reference (頤安本草).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "images");
const SOURCE = path.join(OUT, "logo-seal.png");

const SIZES = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

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
  if (!fs.existsSync(SOURCE)) {
    console.error("Missing images/logo-seal.png — add the brand seal reference first.");
    process.exit(1);
  }

  console.log("Resizing logo-seal.png → favicon sizes…");
  for (const { name, size } of SIZES) {
    const outPath = path.join(OUT, name);
    await sharp(SOURCE)
      .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`  ${name}`);
  }

  const icoPath = path.join(OUT, "favicon.ico");
  await writeIco(path.join(OUT, "favicon-32x32.png"), icoPath);
  console.log("  favicon.ico");
  console.log("Done → images/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
