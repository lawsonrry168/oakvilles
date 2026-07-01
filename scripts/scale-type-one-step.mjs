#!/usr/bin/env node
/**
 * Scale site typography down one step (~20/21) in CSS files.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SCALE = 20 / 21;
const FILES = ["css/dongfang.css", "css/home.css"];

function scalePx(n) {
  if (n <= 11) return n;
  return Math.round(n * SCALE * 10) / 10;
}

function scaleRem(n) {
  return Math.round(n * SCALE * 1000) / 1000;
}

function processCss(text) {
  const tokenMap = {
    "--text-2xs": 16,
    "--text-xs": 17,
    "--text-sm": 19,
    "--text-base": 20,
    "--text-md": 22,
    "--text-lg": 24,
    "--text-xl": 26,
    "--text-2xl": 28,
  };

  let out = text.replace(
    /(--text-(?:2xs|xs|sm|base|md|lg|xl|2xl)):\s*(\d+(?:\.\d+)?)px/g,
    (match, name, value) => {
      if (tokenMap[name]) return `${name}:${tokenMap[name]}px`;
      return `${name}:${scalePx(parseFloat(value))}px`;
    }
  );

  out = out.replace(/font-size:\s*(\d+(?:\.\d+)?)px/g, (match, value) => {
    const n = parseFloat(value);
    if (n <= 11) return match;
    const scaled = scalePx(n);
    const formatted = Number.isInteger(scaled) ? String(scaled) : String(scaled);
    return `font-size:${formatted}px`;
  });

  out = out.replace(/clamp\(([^)]+)\)/g, (match, inner) => {
    const scaled = inner.replace(/(\d+(?:\.\d+)?)rem/g, (m, rem) => `${scaleRem(parseFloat(rem))}rem`);
    return `clamp(${scaled})`;
  });

  out = out.replace(/font-size:\s*(\d+(?:\.\d+)?)rem/g, (match, value) => {
    const n = parseFloat(value);
    if (n <= 0.5) return match;
    return `font-size:${scaleRem(n)}rem`;
  });

  out = out.replace(/正文約 21px/g, "正文約 20px");

  return out;
}

for (const rel of FILES) {
  const file = path.join(ROOT, rel);
  const before = fs.readFileSync(file, "utf8");
  const after = processCss(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    console.log(`scaled ${rel}`);
  }
}
