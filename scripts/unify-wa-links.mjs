import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "src");
const WA_UNIFIED =
  "https://wa.me/{{ site.whatsapp }}?text={{ t.waGreeting | urlencode }}";
const WA_PHONE = "https://wa.me/{{ site.whatsapp }}";

// Match any wa.me/85267349532 URL (with or without ?text=...)
const WA_ANY = /https:\/\/wa\.me\/85267349532(?:\?[^"'\s>]*)?/g;

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else if (name.endsWith(".html") || name.endsWith(".njk")) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let raw = readFileSync(file, "utf8");
  if (!raw.includes("wa.me/85267349532")) continue;

  if (raw.includes("{{ site.whatsapp }}")) continue;

  const next = raw.replace(WA_ANY, (match) => {
    // Bare phone links (no query) — keep without preset message; dongfang.js fills at runtime
    if (match === "https://wa.me/85267349532") return WA_PHONE;
    return WA_UNIFIED;
  });

  if (next !== raw) {
    writeFileSync(file, next, "utf8");
    changed += 1;
    console.log("updated:", file.replace(ROOT + "\\", "").replace(ROOT + "/", ""));
  }
}

console.log(`Done. ${changed} file(s) updated.`);
