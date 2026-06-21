#!/usr/bin/env node
/**
 * Layout overflow audit — run against local dev server.
 * Usage: node scripts/layout-audit.mjs [baseUrl]
 */
const BASE = process.argv[2] || 'http://localhost:3011';

const PAGES = [
  '/',
  '/about.html',
  '/about/central-hk.html',
  '/services.html',
  '/services/skin.html',
  '/conditions/eczema.html',
  '/contact.html',
  '/faq.html',
  '/process.html',
  '/blog/index.html',
  '/blog/eczema-from-within.html',
  '/clinic.html',
  '/news/',
  '/en/',
  '/en/about.html',
  '/en/services.html',
  '/en/faq.html',
  '/en/contact.html',
  '/en/blog/index.html',
  '/en/news/',
];

const WIDTHS = [390, 768, 1440];

function auditHtml(html, width) {
  // Strip scripts for safety; measure via regex approximations isn't reliable.
  // This script uses fetch + simple checks only as fallback.
  return { width, note: 'use browser audit' };
}

async function main() {
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch {
    console.error('Install puppeteer: npm i -D puppeteer');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const results = [];

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });

    for (const path of PAGES) {
      const url = BASE + path;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      } catch (e) {
        results.push({ path, width, error: e.message });
        continue;
      }

      const data = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const issues = [];
        document.querySelectorAll('body *').forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.width < 4 || r.height < 4) return;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') return;
          let p = el.parentElement;
          while (p && p !== document.body) {
            const pcs = getComputedStyle(p);
            if (pcs.overflowX === 'hidden' || pcs.overflow === 'hidden' || pcs.overflowX === 'clip') return;
            p = p.parentElement;
          }
          if (r.right > vw + 2) {
            issues.push({
              cls: String(el.className || '').slice(0, 55),
              tag: el.tagName,
              over: Math.round(r.right - vw),
            });
          }
        });
        const cta = document.querySelector('.df-nav__cta');
        return {
          vw,
          sw,
          overflow: sw > vw + 1,
          px: sw - vw,
          ctaDisplay: cta ? getComputedStyle(cta).display : null,
          issues: issues.slice(0, 5),
        };
      });

      results.push({ path, width, ...data });
    }
    await page.close();
  }

  await browser.close();

  const bad = results.filter((r) => r.overflow || (r.issues && r.issues.length));
  console.log('\n=== Layout Audit ===\n');
  for (const r of results) {
    const flag = r.overflow ? 'OVERFLOW' : r.issues?.length ? 'CLIP' : 'OK';
    console.log(`${flag.padEnd(8)} ${String(r.width).padStart(4)}px  ${r.path}${r.overflow ? ` (+${r.px}px)` : ''}`);
    if (r.issues?.length) {
      r.issues.forEach((i) => console.log(`         └ ${i.tag}.${i.cls} +${i.over}px`));
    }
  }
  console.log(`\n${bad.length ? bad.length + ' issue(s)' : 'All clear'} across ${results.length} checks.`);
  process.exit(bad.some((r) => r.overflow) ? 1 : 0);
}

main();
