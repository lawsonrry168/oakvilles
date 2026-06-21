import fs from "fs";

function readSchema(html) {
  const m = html.match(/application\/ld\+json">\s*([\s\S]*?)<\/script>/);
  return m ? JSON.parse(m[1]) : null;
}

const faq = readSchema(fs.readFileSync("_site/faq.html", "utf8"));
console.log("FAQ", faq?.["@type"], "questions", faq?.mainEntity?.length);

const enFaq = readSchema(fs.readFileSync("_site/en/faq.html", "utf8"));
console.log("EN FAQ", enFaq?.["@type"], "questions", enFaq?.mainEntity?.length);

const blog = readSchema(fs.readFileSync("_site/blog/eczema-from-within.html", "utf8"));
console.log("Blog", blog?.["@type"], blog?.headline?.slice(0, 30));

const cond = readSchema(fs.readFileSync("_site/conditions/eczema.html", "utf8"));
console.log("Condition", cond?.["@type"], cond?.specialty);

const enCond = readSchema(fs.readFileSync("_site/en/conditions/eczema.html", "utf8"));
console.log("EN Condition", enCond?.["@type"], enCond?.inLanguage);
