import fs from "fs";
import path from "path";

const PAD = " · 頤安本草中環錦安大廈 6 樓 · WhatsApp 6734 9532 預約。";

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html") && !p.includes("_includes")) acc.push(p);
  }
  return acc;
}

function replaceField(block, name, value) {
  const re = new RegExp(`^${name}:\\s*\"[\\s\\S]*?\"\\s*$`, "m");
  return re.test(block) ? block.replace(re, `${name}: "${value}"`) : block;
}

let changed = 0;
for (const file of walk("src")) {
  if (file.replace(/\\/g, "/").includes("/en/")) continue;
  let raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) continue;
  const desc = (fmMatch[1].match(/^description:\s*"(.*)"/m) || [])[1];
  if (!desc || desc.length >= 110) continue;

  let nextDesc = desc;
  while (nextDesc.length < 110) {
    nextDesc += PAD;
    if (nextDesc.length > 165) {
      nextDesc = desc + PAD.slice(0, 110 - desc.length);
      break;
    }
  }
  if (nextDesc.length > 165) nextDesc = nextDesc.slice(0, 162) + "…";

  let fm = replaceField(replaceField(fmMatch[1], "description", nextDesc), "ogDescription", nextDesc);
  fs.writeFileSync(file, raw.replace(fmMatch[1], fm), "utf8");
  changed += 1;
  console.log(`padded: ${file.replace(/\\/g, "/")} (${desc.length} → ${nextDesc.length})`);
}

console.log(`Done. ${changed} file(s) padded.`);
