#!/usr/bin/env node
/**
 * Normalize English doctor name to Dr. Ng Hau Jun across source files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXT = new Set([".html", ".njk", ".json", ".js", ".mjs", ".md", ".txt", ".py"]);

const REPLACEMENTS = [
  [/Dr\.?\s*Ng\s+Hau\s+Chun/gi, "Dr. Ng Hau Jun"],
  [/Ng\s+Hau\s+Chun/gi, "Ng Hau Jun"],
  [/Hau\s+Chun/gi, "Hau Jun"],
  [/<em>\s*Chun\s*<\/em>/gi, "<em> Jun</em>"],
  [/\bDr Ng Hau Jun\b/g, "Dr. Ng Hau Jun"],
  [/\bAbout Dr. Ng Hau Jun\b/g, "About Dr. Ng Hau Jun"],
  [/\bDr Ng\b(?!\.)/g, "Dr. Ng"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "_site" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes(`${path.sep}__pycache__`)) continue;
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [re, rep] of REPLACEMENTS) {
    text = text.replace(re, rep);
  }
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    changed++;
    console.log(path.relative(ROOT, file));
  }
}
console.log(`\n${changed} file(s) updated.`);
