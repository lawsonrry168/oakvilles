import fs from "fs";
import path from "path";

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html") && !p.includes("_includes")) acc.push(p);
  }
  return acc;
}

for (const f of walk("src").sort()) {
  const raw = fs.readFileSync(f, "utf8").replace(/^\uFEFF/, "");
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) continue;
  const desc = (m[1].match(/^description:\s*"(.*)"/m) || [])[1];
  if (!desc) continue;
  const flag = desc.length < 110 || desc.length > 165 ? "*" : " ";
  console.log(`${flag}${desc.length}\t${f.replace(/\\/g, "/")}`);
}
