import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html")) acc.push(p);
  }
  return acc;
}

function parsePage(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^"|"$/g, "");
  }
  const body = m[2];
  const h1m = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1 = h1m ? h1m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
  const h2s = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((x) =>
    x[1].replace(/<[^>]+>/g, "").trim()
  );
  const imgs = [...body.matchAll(/<img[^>]*>/g)].map((x) => x[0]);
  const emptyAlt = imgs.filter((t) => !/alt="[^"]+"/.test(t) || /alt=""/.test(t)).length;
  const internalLinks = [...body.matchAll(/href="(\/[^"#]+)"/g)].map((x) => x[1]);
  const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const kw = fm.keywords || "";
  const eczemaHits = (text + " " + fm.title + " " + fm.description + " " + kw).match(/濕疹|eczema/gi)?.length || 0;
  return {
    file,
    fm,
    h1,
    h2s,
    h2Count: h2s.length,
    imgCount: imgs.length,
    emptyAlt,
    internalLinks: internalLinks.length,
    words: text.length,
    eczemaHits,
    hasSchema: !!fm.schema,
  };
}

const files = walk("src").filter(
  (f) => !f.includes("_includes") && !f.includes("redirect") && !f.includes("central-hk.html") || f.includes("conditions")
);
const allFiles = walk("src").filter((f) => f.endsWith(".html") && !f.includes("_includes"));

const rows = allFiles
  .map((f) => {
    const d = parsePage(f);
    if (!d || d.fm.layout?.includes("redirect")) return null;
    const t = d.fm.title || "";
    const desc = d.fm.description || "";
    const issues = [];
    if (t.length < 28 || t.length > 62) issues.push(`title-len:${t.length}`);
    if (desc.length < 110 || desc.length > 165) issues.push(`meta-len:${desc.length}`);
    if (!d.h1) issues.push("no-h1");
    if (d.internalLinks < 2) issues.push(`links:${d.internalLinks}`);
    if (d.words < 350) issues.push(`thin:${d.words}`);
    if (d.emptyAlt > 0) issues.push(`alt:${d.emptyAlt}`);
    if (!d.fm.canonical) issues.push("no-canonical");
    return {
      file: f.replace(/\\/g, "/"),
      url: (d.fm.canonical || "").replace("https://oakvilles.com", ""),
      title: t,
      titleLen: t.length,
      metaLen: desc.length,
      h1: d.h1,
      h2: d.h2Count,
      links: d.internalLinks,
      words: d.words,
      eczemaHits: d.eczemaHits,
      issues,
      lang: f.includes("/en/") ? "en" : "zh",
    };
  })
  .filter(Boolean);

const byCluster = {
  home: rows.filter((r) => r.url === "/" || r.url === "/en/"),
  service: rows.filter((r) => r.url.includes("/services")),
  condition: rows.filter((r) => r.url.includes("/conditions")),
  blog: rows.filter((r) => r.url.includes("/blog")),
  news: rows.filter((r) => r.url.includes("/news")),
  core: rows.filter((r) => ["/about.html", "/contact.html", "/faq.html", "/process.html", "/clinic.html", "/services.html", "/en/about.html", "/en/contact.html", "/en/faq.html", "/en/process.html", "/en/clinic.html", "/en/services.html"].includes(r.url)),
};

const outPath = "scripts/seo-audit-data.json";
fs.writeFileSync(outPath, JSON.stringify({ total: rows.length, byCluster: Object.fromEntries(Object.entries(byCluster).map(([k,v])=>[k,v.length])), rows, issueSummary: rows.reduce((a,r)=>{r.issues.forEach(i=>{const k=i.split(':')[0];a[k]=(a[k]||0)+1});return a},{}) }, null, 2));
console.log("Wrote", outPath, "total", rows.length);
