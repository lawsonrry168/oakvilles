#!/usr/bin/env node
/** Bump font-size: Npx (+STEP px; skip decorative ≥32px & --text- tokens). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const STEP = Number(process.env.TYPE_STEP || 3);
const SKIP_FROM = 32;
const FILES = ["css/dongfang.css", "css/home.css"];
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function bumpPx(n) {
  if (n >= SKIP_FROM) return n;
  return n + STEP;
}

function bumpLine(line) {
  if (/^\s*--text-/.test(line)) return line;
  let c = line.replace(
    /font-size:\s*clamp\(\s*([\d.]+)px\s*,\s*([^,]+)\s*,\s*([\d.]+)px\s*\)/g,
    (_, a, mid, b) =>
      `font-size:clamp(${bumpPx(parseFloat(a))}px, ${mid.trim()}, ${bumpPx(parseFloat(b))}px)`
  );
  c = c.replace(/font-size:\s*([\d.]+)px/g, (m, raw) => {
    const n = parseFloat(raw);
    if (n >= SKIP_FROM) return m;
    return `font-size:${bumpPx(n)}px`;
  });
  return c;
}

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(
    file,
    fs
      .readFileSync(file, "utf8")
      .split("\n")
      .map(bumpLine)
      .join("\n")
  );
  console.log(`+${STEP}px → ${rel}`);
}
