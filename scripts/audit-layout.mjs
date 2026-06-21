/**
 * Layout overflow audit — run after build with local server or parse _site HTML + CSS hints.
 * Checks CSS for known risk patterns across pages.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, '_site');

const PAGES = [
  'index.html',
  'en/index.html',
  'about.html',
  'en/about.html',
  'services.html',
  'en/services.html',
  'services/pain.html',
  'en/services/pain.html',
  'faq.html',
  'en/faq.html',
  'contact.html',
  'en/contact.html',
  'blog/index.html',
  'en/blog/index.html',
  'conditions/eczema.html',
  'en/conditions/eczema.html',
  'process.html',
  'en/process.html',
];

const RISK_PATTERNS = [
  { name: 'hours-table-3col', re: /df-home-hours__(?:head|row)/, issue: '首頁時段表固定三欄，窄螢幕易溢出' },
  { name: 'funnel-2col', re: /df-funnel__options/, issue: '預約 funnel 選項永遠 2 欄，極窄螢幕過密' },
  { name: 'nav-nowrap-brand', re: /df-nav__brand[^}]*white-space:\s*nowrap/, issue: '導航品牌 nowrap，EN 長文案易擠壓' },
  { name: 'page-hero-watermark-vw', re: /df-page-hero__watermark[^}]*font-size:\s*\d+vw/, issue: '內頁 hero 水印 vw 單位，小螢幕可能過大' },
  { name: 'photo-deco-negative', re: /df-photo-card__deco[^}]*(?:left|right):\s*-/, issue: '照片卡裝飾負 offset，可能觸發水平溢出' },
];

const css = fs.readFileSync(path.join(ROOT, 'css', 'dongfang.css'), 'utf8')
  + fs.readFileSync(path.join(ROOT, 'css', 'home.css'), 'utf8');

const cssRisks = RISK_PATTERNS.filter(p => p.re.test(css)).map(p => ({ pattern: p.name, issue: p.issue }));

const htmlRisks = [];
for (const rel of PAGES) {
  const fp = path.join(SITE, rel);
  if (!fs.existsSync(fp)) continue;
  const html = fs.readFileSync(fp, 'utf8');
  const hits = [];
  if (html.includes('df-home-hours__head')) hits.push('含時段表三欄 grid（僅首頁）');
  if (html.includes('df-funnel__options')) hits.push('含預約 funnel 雙欄選項');
  if (html.includes('df-sticky-cta')) hits.push('含 mobile sticky CTA bar');
  if (html.includes('df-page-hero__watermark')) hits.push('含 vw 水印 hero');
  if (html.includes('df-photo-card__deco')) hits.push('含照片卡負 offset 裝飾');
  if (html.includes('lang-en') || html.includes('lang="en"')) hits.push('EN 頁');
  else hits.push('ZH 頁');
  if (hits.length > 1) htmlRisks.push({ page: rel, markers: hits });
}

// Nav CTA breakpoint mismatch: CSS has cta at 640px, burger hidden at 1280px
const navBreakpointIssue = {
  issue: 'Nav CTA 640px 顯示但漢堡 1280px 才隱藏 → 640–1279px 標頭過擠',
  severity: 'high',
  affects: 'zh + en, tablet',
};

console.log(JSON.stringify({ cssRisks, navBreakpointIssue, pageMarkers: htmlRisks }, null, 2));
