#!/usr/bin/env node
/**
 * Full-site review — scans built HTML for common issues (ZH + EN).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.join(__dirname, "..", "_site");

function walkHtml(dir, base = "") {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = base ? `${base}/${name}` : name;
    if (fs.statSync(full).isDirectory()) out.push(...walkHtml(full, rel));
    else if (name.endsWith(".html")) out.push({ rel, full });
  }
  return out;
}

const pages = walkHtml(SITE);
const issues = [];

for (const { rel, full } of pages) {
  const html = fs.readFileSync(full, "utf8");
  const isEn = rel.startsWith("en/") || rel === "en/index.html";
  const locale = isEn ? "en" : "zh";

  if (/<(?:strong|summary|h5|button[^>]*nav-drop)[^>]*>\s*<\/(?:strong|summary|h5|button)/i.test(html))
    issues.push({ sev: "CRITICAL", locale, rel, msg: "Empty nav/footer/summary element" });

  if (/aria-label=""\s/.test(html) || /aria-label=""><\/button/.test(html))
    issues.push({ sev: "HIGH", locale, rel, msg: "Empty aria-label" });

  if (!html.includes("df-critical") && html.includes("<html"))
    issues.push({ sev: "MEDIUM", locale, rel, msg: "Missing critical inline CSS" });

  if (!html.includes("dongfang.css"))
    issues.push({ sev: "CRITICAL", locale, rel, msg: "Missing dongfang.css" });

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || "";
  if (!title) issues.push({ sev: "CRITICAL", locale, rel, msg: "Missing title" });
  else if (title.length > 65) issues.push({ sev: "LOW", locale, rel, msg: `Title long (${title.length}): ${title.slice(0, 50)}…` });

  const desc = html.match(/name="description" content="([^"]*)"/)?.[1];
  if (!desc) issues.push({ sev: "HIGH", locale, rel, msg: "Missing meta description" });
  else if (desc.length < 80) issues.push({ sev: "MEDIUM", locale, rel, msg: `Short meta (${desc.length} chars)` });
  else if (desc.length > 165) issues.push({ sev: "LOW", locale, rel, msg: `Long meta (${desc.length} chars)` });

  if (isEn) {
    if (/伍厚臻|伍醫師|中環皇后|錦安大廈|週六應診|診症專科|關於我們|網站導覽/.test(html))
      issues.push({ sev: "HIGH", locale, rel, msg: "Hardcoded Chinese on EN page" });
    if (/Dr\.?\s*Wu|Dr Wu/i.test(html))
      issues.push({ sev: "CRITICAL", locale, rel, msg: "Old doctor name Dr Wu" });
    if (!html.includes('lang="en"'))
      issues.push({ sev: "HIGH", locale, rel, msg: "Missing lang=en" });
    if (html.match(/href="\/(?!en\/)[^"]*\.html"/g)?.some((h) => !h.includes('href="/#')))
      issues.push({ sev: "MEDIUM", locale, rel, msg: "Internal link may point outside /en/" });
  } else {
    if (/Dr\.?\s*Wu|Dr Wu/i.test(html))
      issues.push({ sev: "CRITICAL", locale, rel, msg: "Old doctor name Dr Wu" });
  }

  if (/maps\.app\.goo\.gl|google\.com\/maps|cmchk\.org\.hk/i.test(html))
    issues.push({ sev: "HIGH", locale, rel, msg: "Disallowed external link" });

  if (!html.includes("df-footer__disclaimer"))
    issues.push({ sev: "HIGH", locale, rel, msg: "Missing footer disclaimer" });

  if (!html.includes("copyright") && !html.includes("版權") && !html.includes("All rights"))
    issues.push({ sev: "MEDIUM", locale, rel, msg: "Missing copyright text" });
}

const bySev = { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] };
for (const i of issues) bySev[i.sev].push(i);

console.log(`\n=== Site Review (${pages.length} HTML pages) ===\n`);
for (const sev of ["CRITICAL", "HIGH", "MEDIUM", "LOW"]) {
  const list = bySev[sev];
  if (!list.length) continue;
  console.log(`\n## ${sev} (${list.length})`);
  for (const i of list) console.log(`  [${i.locale}] ${i.rel}: ${i.msg}`);
}
console.log(`\nTotal issues: ${issues.length}`);
