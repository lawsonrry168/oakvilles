import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, '_site');

function walk(dir, out = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const htmlFiles = walk(SITE);
const ogIssues = [];
const ogOk = [];

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(SITE, f).replace(/\\/g, '/');
  const og = html.match(/property="og:image" content="([^"]+)"/);
  const ogW = html.match(/property="og:image:width" content="([^"]+)"/);
  const ogH = html.match(/property="og:image:height" content="([^"]+)"/);
  if (!og) {
    ogIssues.push({ page: rel, issue: 'missing og:image' });
    continue;
  }
  const url = og[1];
  const imgPath = url.replace(/^https?:\/\/[^/]+/, '').replace(/^\//, '');
  const local = path.join(SITE, ...imgPath.split('/'));
  const exists = fs.existsSync(local);
  const badDomain = /oakvilles\.com/.test(url);
  if (!exists || badDomain) {
    ogIssues.push({ page: rel, og: url, exists, badDomain });
  } else {
    ogOk.push({ page: rel, og: url, w: ogW?.[1], h: ogH?.[1] });
  }
}

// Nav script presence
const navScriptIssues = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(SITE, f).replace(/\\/g, '/');
  if (rel.includes('central-hk')) continue;
  if (!html.includes('dongfang.js')) navScriptIssues.push({ page: rel, issue: 'missing dongfang.js' });
  if (html.includes('dataset.dongfangInit') || html.match(/<script[^>]*>\s*document\.addEventListener\('DOMContentLoaded'/)) {
    navScriptIssues.push({ page: rel, issue: 'inline duplicate init risk' });
  }
}

// Internal link check (root-relative only in href="/...")
const linkIssues = [];
const hrefRe = /href="(\/[^"#?][^"]*)"/g;
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const rel = path.relative(SITE, f).replace(/\\/g, '/');
  const dir = path.dirname(rel === '.' ? '' : rel);
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    if (href.startsWith('//') || href.includes('wa.me') || href.includes('instagram') || href.includes('facebook')) continue;
    let target = href.replace(/^\//, '');
    if (target.endsWith('/')) target += 'index.html';
    if (!target.endsWith('.html') && !target.includes('.')) {
      const asDir = path.join(SITE, target, 'index.html');
      const asFile = path.join(SITE, target + '.html');
      if (!fs.existsSync(asDir) && !fs.existsSync(asFile)) {
        linkIssues.push({ from: rel, href, issue: 'target not found' });
      }
    } else {
      const fp = path.join(SITE, ...target.split('/'));
      if (!fs.existsSync(fp)) linkIssues.push({ from: rel, href, issue: 'target not found' });
    }
  }
}

console.log(JSON.stringify({
  pages: htmlFiles.length,
  ogOk: ogOk.length,
  ogIssues,
  navScriptIssues,
  linkIssues: linkIssues.slice(0, 30),
  linkIssueCount: linkIssues.length,
}, null, 2));
