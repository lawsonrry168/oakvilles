import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', 'src', 'en');
const EMPTY = 'https://wa.me/85267349532?text="';
const GREETING = 'https://wa.me/85267349532?text=Hello%2C%20I%27d%20like%20to%20book%20an%20appointment%20with%20Dr.%20Ng."';

const BROKEN = 'Dr.%20Ng. target';
const FIXED = 'Dr.%20Ng." target';

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else if (name.endsWith('.html')) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let raw = readFileSync(file, 'utf8');
  let next = raw;
  if (next.includes(EMPTY)) next = next.split(EMPTY).join(GREETING);
  if (next.includes(BROKEN)) next = next.split(BROKEN).join(FIXED);
  if (next === raw) continue;
  writeFileSync(file, next, 'utf8');
  changed += 1;
  console.log('fixed:', file);
}
console.log(`Done. ${changed} file(s) updated.`);
