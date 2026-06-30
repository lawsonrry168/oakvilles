#!/usr/bin/env node
/**
 * Render all site seals: yang lishu → yin #2E3640 (unified pipeline).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { yangSealHtml, yangToYin } from "./seal-utils.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "images/seals");
/** Authoritative 隸書 artwork for 頤安本草 — do not font-rasterize */
const BRAND_REF = path.join(ROOT, "images/logo-seal-lishu-source.png");

export const SEALS = [
  { id: "yi-an-ben-cao", chars: ["頤", "安", "本", "草"], label: "頤安本草", fromRef: true },
  { id: "hou-zhen-yi-shi", chars: ["厚", "臻", "醫", "師"], label: "厚臻醫師" },
  { id: "yi-zhe-ren-xin", chars: ["醫", "者", "仁", "心"], label: "醫者仁心" },
  { id: "zhen-jin-gu-suan", chars: ["診", "金", "估", "算"], label: "診金估算" },
  { id: "yu-yue-deng-ji", chars: ["預", "約", "登", "記"], label: "預約登記" },
];

async function renderYang(browser, chars) {
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 2 });
  await page.setContent(yangSealHtml(chars), { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 800));
  const fontFamily = await page.evaluate(() => {
    const el = document.querySelector(".yang-seal span");
    return el ? getComputedStyle(el).fontFamily : "";
  });
  if (!fontFamily.includes("Oakville-Lishu")) {
    console.warn("  warn: seal font may have fallen back —", fontFamily);
  }
  const buf = await page.screenshot({ type: "png", omitBackground: true });
  await page.close();
  return buf;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });
  try {
    for (const seal of SEALS) {
      const outPath = path.join(OUT_DIR, `${seal.id}.png`);
      if (seal.fromRef && fs.existsSync(BRAND_REF)) {
        await yangToYin(BRAND_REF, outPath);
        console.log(`  ${seal.id}.png (隸書參考圖)`);
        continue;
      }
      const yang = await renderYang(browser, seal.chars);
      await yangToYin(yang, outPath);
      console.log(`  ${seal.id}.png`);
    }
  } finally {
    await browser.close();
  }

  const brand = path.join(OUT_DIR, "yi-an-ben-cao.png");
  if (fs.existsSync(brand)) {
    fs.copyFileSync(brand, path.join(ROOT, "images/logo-seal.png"));
    fs.copyFileSync(brand, path.join(ROOT, "images/logo-seal-media.png"));
  }

  console.log("Done → images/seals/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
