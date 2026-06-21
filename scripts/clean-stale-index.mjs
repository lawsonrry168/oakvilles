/**
 * Remove stale `page/index.html` copies when Eleventy outputs `page.html`.
 * Old exports left duplicate routes with outdated content and external links.
 */
import fs from "fs";
import path from "path";

const siteDir = path.resolve("_site");

function walk(dir, remove) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, remove);
      const siblingHtml = `${full}.html`;
      const indexHtml = path.join(full, "index.html");
      if (fs.existsSync(siblingHtml) && fs.existsSync(indexHtml)) {
        remove.push(indexHtml);
      }
    }
  }
}

const toRemove = [];
walk(siteDir, toRemove);

for (const file of toRemove) {
  fs.unlinkSync(file);
  console.log("Removed stale:", path.relative(siteDir, file));
}

if (!toRemove.length) {
  console.log("No stale index.html files found.");
}
