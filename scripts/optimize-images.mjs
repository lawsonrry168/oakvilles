#!/usr/bin/env node
/**
 * PNG/JPEG → WebP variants + responsive-images manifest for Eleventy transform.
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "images");
const MANIFEST_PATH = path.join(ROOT, "src", "_data", "responsive-images.json");

const WIDTHS = [640, 1280, 1920];
const SKIP_EXT = new Set([".svg", ".webp", ".gif"]);
const QUALITY = 82;

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.warn("sharp not installed — run npm install. Skipping image optimization.");
    return null;
  }
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function toWebUrl(filePath) {
  return "/" + path.relative(ROOT, filePath).split(path.sep).join("/");
}

async function processImage(sharp, filePath, manifest) {
  const ext = path.extname(filePath).toLowerCase();
  if (SKIP_EXT.has(ext)) return;

  const rel = path.relative(IMAGES_DIR, filePath);
  const baseName = rel.replace(/\.[^.]+$/, "");
  const srcUrl = toWebUrl(filePath);

  let meta;
  try {
    meta = await sharp(filePath).metadata();
  } catch (err) {
    console.warn(`skip ${rel}: ${err.message}`);
    return;
  }

  const variants = [];
  for (const width of WIDTHS) {
    if (meta.width && width > meta.width) continue;
    const outRel = `${baseName}-${width}.webp`;
    const outPath = path.join(IMAGES_DIR, outRel);
    await sharp(filePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    variants.push({ url: toWebUrl(outPath), width });
  }

  if (!variants.length) return;

  manifest[srcUrl] = {
    webp: variants,
    sizes: "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px",
  };
  console.log(`  ${rel} → ${variants.length} webp`);
}

async function main() {
  const sharp = await loadSharp();
  if (!sharp) {
    fs.writeFileSync(MANIFEST_PATH, "{}\n");
    return;
  }

  const files = walk(IMAGES_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return [".png", ".jpg", ".jpeg"].includes(ext);
  });

  if (!files.length) {
    console.log("No raster images in images/ — manifest left empty.");
    fs.writeFileSync(MANIFEST_PATH, "{}\n");
    return;
  }

  const manifest = {};
  console.log(`Optimizing ${files.length} images…`);
  for (const file of files) {
    await processImage(sharp, file, manifest);
  }

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Manifest → ${path.relative(ROOT, MANIFEST_PATH)} (${Object.keys(manifest).length} entries)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
