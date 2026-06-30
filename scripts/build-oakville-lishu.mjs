#!/usr/bin/env node
/**
 * Build Oakville-Lishu from Windows SIMLI — same glyph source as classic seal 隶书.
 * Outputs fonts/oakville-lishu.woff2 + .ttf for web + Puppeteer seals.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import subsetFont from "subset-font";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const OUT_WOFF2 = path.join(ROOT, "fonts/oakville-lishu.woff2");
const OUT_TTF = path.join(ROOT, "fonts/oakville-lishu.ttf");
const CSS_SNIPPET = path.join(ROOT, "css/oakville-lishu.css");

const SIMLI_CANDIDATES = [
  process.env.SIMLI_PATH,
  "C:/Windows/Fonts/SIMLI.TTF",
  "C:/Windows/Fonts/simli.ttf",
  "/usr/share/fonts/truetype/chinese/SIMLI.TTF",
].filter(Boolean);

const SEAL_CHARS = "頤安本草厚臻醫師者仁心診金估算預約登記";
const EXTRA = "伍";

function collectFromHtml(dir) {
  let text = "";
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name.startsWith("_")) continue;
      text += collectFromHtml(p);
      continue;
    }
    if (!name.name.endsWith(".html") && !name.name.endsWith(".njk")) continue;
    const raw = fs.readFileSync(p, "utf8");
    for (const m of raw.matchAll(
      /df-page-hero__watermark[^>]*>([^<]+)|df-home-creed__watermark[^>]*>([^<]+)|class="brush"[^>]*>([^<]+)|df-home-hero__type-cn[^>]*>[\s\S]*?<\/div>|df-photo-card__name[^>]*>([^<]+)/g
    )) {
      text += (m[1] || m[2] || m[3] || m[4] || m[5] || "").replace(/<[^>]+>/g, "");
    }
  }
  return text;
}

function uniqueChars(...parts) {
  const set = new Set();
  for (const s of parts.join("")) {
    if (/\p{Script=Han}/u.test(s)) set.add(s);
  }
  return [...set].sort().join("");
}

function findSimli() {
  for (const p of SIMLI_CANDIDATES) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function main() {
  const simli = findSimli();
  if (!simli) {
    if (fs.existsSync(OUT_WOFF2) && fs.existsSync(OUT_TTF)) {
      console.log("SIMLI not found — using existing fonts/oakville-lishu.*");
      return;
    }
    console.error("SIMLI.TTF not found. Set SIMLI_PATH or run on Windows.");
    process.exit(1);
  }

  const chars = uniqueChars(SEAL_CHARS, EXTRA, collectFromHtml(SRC));
  const font = fs.readFileSync(simli);
  fs.mkdirSync(path.dirname(OUT_WOFF2), { recursive: true });

  const woff2 = await subsetFont(font, chars, { targetFormat: "woff2" });
  const ttf = await subsetFont(font, chars, { targetFormat: "truetype" });
  fs.writeFileSync(OUT_WOFF2, woff2);
  fs.writeFileSync(OUT_TTF, ttf);

  fs.writeFileSync(
    CSS_SNIPPET,
    `/* Oakville-Lishu · subset from SIMLI 隶书 — matches seal PNG pipeline */
@font-face{
  font-family:"Oakville-Lishu";
  src:local("LiSu"),local("隶书"),local("STLiti"),
      url("../fonts/oakville-lishu.woff2") format("woff2");
  font-weight:400; font-style:normal; font-display:swap;
}
`
  );

  console.log(`Oakville-Lishu (${chars.length} chars) → fonts/oakville-lishu.*`);
  console.log(chars);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
