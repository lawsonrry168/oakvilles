import fs from "fs";

function extractFaq(html) {
  const items = [];
  const blockRe = /class="df-faq-item"[\s\S]*?<\/div>\s*<\/div>/g;
  const qRe = /class="df-faq-q"[^>]*>([\s\S]*?)<svg/;
  const aRe = /class="df-faq-a__inner"><p>([\s\S]*?)<\/p>/;
  for (const block of html.match(blockRe) || []) {
    const qm = block.match(qRe);
    const am = block.match(aRe);
    if (!qm || !am) continue;
    const q = qm[1].replace(/\s+/g, " ").trim();
    const a = am[1]
      .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    items.push({ q, a });
  }
  return items;
}

const zh = extractFaq(fs.readFileSync("src/faq.html", "utf8"));
const en = extractFaq(fs.readFileSync("src/en/faq.html", "utf8"));
const out = { zh, en };
fs.writeFileSync("src/_data/faq-items.json", JSON.stringify(out, null, 2) + "\n");
console.log("zh:", zh.length, "en:", en.length);
