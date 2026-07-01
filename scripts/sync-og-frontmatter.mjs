#!/usr/bin/env node
/**
 * Normalize ogImage paths in src HTML files to /images/og assets.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");

const REPLACEMENTS = [
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/og\/og-home-1200\.jpg"/g, 'ogImage: "/images/og/og-home-1200.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/og\/og-default\.png"/g, 'ogImage: "/images/og/og-default.png"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/og\/og-blog\.png"/g, 'ogImage: "/images/og/og-blog.png"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/og\/og-process\.png"/g, 'ogImage: "/images/og/og-process.png"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/skin-hero\.png"/g, 'ogImage: "/images/og/og-svc-skin.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/acupuncture-hero\.png"/g, 'ogImage: "/images/og/og-svc-acupuncture.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/pain-hero\.png"/g, 'ogImage: "/images/og/og-svc-pain.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/internal-hero\.png"/g, 'ogImage: "/images/og/og-svc-internal.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/gynaecology-hero\.png"/g, 'ogImage: "/images/og/og-svc-gynaecology.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/herbs-hero\.png"/g, 'ogImage: "/images/og/og-svc-herbs.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/cupping-hero\.png"/g, 'ogImage: "/images/og/og-svc-cupping.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/services\/moxibustion-hero\.png"/g, 'ogImage: "/images/og/og-svc-moxibustion.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/conditions\/acne\.png"/g, 'ogImage: "/images/og/og-cond-acne.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/conditions\/sciatica\.png"/g, 'ogImage: "/images/og/og-cond-sciatica.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/conditions\/neck-pain\.png"/g, 'ogImage: "/images/og/og-cond-neck-pain.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/blog-acne\.png"/g, 'ogImage: "/images/og/og-article-acne.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/blog-eczema\.png"/g, 'ogImage: "/images/og/og-article-eczema.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/blog-insomnia\.png"/g, 'ogImage: "/images/og/og-article-insomnia.jpg"'],
  [/ogImage:\s*"https?:\/\/[^"]*\/images\/blog-fertility\.png"/g, 'ogImage: "/images/og/og-article-fertility.jpg"'],
];

const PAGE_OVERRIDES = {
  "services.html": "/images/og/og-services.png",
  "en/services.html": "/images/og/og-services.png",
  "about.html": "/images/og/og-about.png",
  "en/about.html": "/images/og/og-about.png",
  "clinic.html": "/images/og/og-clinic.png",
  "en/clinic.html": "/images/og/og-clinic.png",
  "contact.html": "/images/og/og-contact.png",
  "en/contact.html": "/images/og/og-contact.png",
  "faq.html": "/images/og/og-faq.png",
  "en/faq.html": "/images/og/og-faq.png",
  "news/index.html": "/images/og/og-news.png",
  "en/news/index.html": "/images/og/og-news.png",
  "news/saturday-hours-2026.html": "/images/og/og-news.png",
  "en/news/saturday-hours-2026.html": "/images/og/og-news.png",
  "about/central-hk.html": "/images/og/og-clinic.png",
  "en/about/central-hk.html": "/images/og/og-clinic.png",
  "conditions/eczema.html": "/images/og/og-cond-eczema.jpg",
  "en/conditions/eczema.html": "/images/og/og-cond-eczema.jpg",
  "conditions/insomnia.html": "/images/og/og-cond-insomnia.jpg",
  "en/conditions/insomnia.html": "/images/og/og-cond-insomnia.jpg",
  "conditions/fertility.html": "/images/og/og-cond-fertility.jpg",
  "en/conditions/fertility.html": "/images/og/og-cond-fertility.jpg",
  "conditions/acne-eczema-central.html": "/images/og/og-svc-skin.jpg",
  "en/conditions/acne-eczema-central.html": "/images/og/og-svc-skin.jpg",
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function relFromSrc(file) {
  return path.relative(SRC, file).replace(/\\/g, "/");
}

let changed = 0;
for (const file of walk(SRC)) {
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [re, rep] of REPLACEMENTS) {
    text = text.replace(re, rep);
  }
  const rel = relFromSrc(file);
  if (PAGE_OVERRIDES[rel]) {
    text = text.replace(/ogImage:\s*"[^"]*"/, `ogImage: "${PAGE_OVERRIDES[rel]}"`);
  }
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    changed++;
    console.log(`updated ${rel}`);
  }
}

console.log(`\n${changed} file(s) updated.`);
