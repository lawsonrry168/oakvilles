import fs from "fs";
import path from "path";

const PATCH = JSON.parse(
  fs.readFileSync(new URL("./meta-descriptions-patch.json", import.meta.url), "utf8")
);

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html") && !p.includes("_includes")) acc.push(p);
  }
  return acc;
}

function normKey(file) {
  return file.replace(/\\/g, "/").replace(/^src\//, "");
}

let changed = 0;
for (const file of walk("src")) {
  const key = normKey(file);
  const patch = PATCH[key];
  if (!patch?.description) continue;

  let raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;

  let fm = fmMatch[1];
  const desc = patch.description;
  const ogDesc = patch.ogDescription || desc;

  const replaceField = (block, name, value) => {
    const re = new RegExp(`^${name}:\\s*\"[\\s\\S]*?\"\\s*$`, "m");
    if (re.test(block)) return block.replace(re, `${name}: "${value}"`);
    return block;
  };

  const nextFm = replaceField(replaceField(fm, "description", desc), "ogDescription", ogDesc);
  if (nextFm === fm) continue;

  const next = raw.replace(fmMatch[1], nextFm);
  fs.writeFileSync(file, next, "utf8");
  changed += 1;
  console.log("patched:", key, `(${desc.length} chars)`);
}

console.log(`Done. ${changed} file(s) patched.`);
