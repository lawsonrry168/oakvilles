const fs = require("fs");

const path = require("path");



const MANIFEST_PATH = path.join(__dirname, "src", "_data", "responsive-images.json");

const SITE_ZH = require("./src/_data/site.json");

const SITE_EN = require("./src/_data/site-en.json");

const FAQ_ITEMS = require("./src/_data/faq-items.json");

const CONDITION_SPECIALTY = {
  "conditions/eczema": "Dermatology",
  "conditions/acne": "Dermatology",
  "conditions/insomnia": "Internal Medicine",
  "conditions/fertility": "Gynecology",
  "conditions/neck-pain": "Pain Management",
  "conditions/sciatica": "Pain Management",
};



function buildMedicalWebPageSchema(data, specialty) {

  const locale = data.locale === "en" ? "en" : "zh-HK";

  return JSON.stringify(

    {

      "@context": "https://schema.org",

      "@type": "MedicalWebPage",

      "@id": data.canonical + "#webpage",

      url: data.canonical,

      name: data.title,

      description: data.description,

      isPartOf: { "@id": "https://oakvilles.com/#organization" },

      about: { "@id": "https://oakvilles.com/#organization" },

      lastReviewed: "2026-06-01",

      inLanguage: locale,

      medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },

      specialty: specialty || "Traditional Chinese Medicine",

    },

    null,

    2

  );

}



function conditionSpecialty(stem) {

  const key = stem.replace(/^en\//, "");

  return CONDITION_SPECIALTY[key] || "Traditional Chinese Medicine";

}

function buildFaqSchema(items, pageUrl, lang) {

  return JSON.stringify(

    {

      "@context": "https://schema.org",

      "@type": "FAQPage",

      "@id": pageUrl + "#faq",

      url: pageUrl,

      inLanguage: lang === "en" ? "en" : "zh-HK",

      isPartOf: { "@id": "https://oakvilles.com/#organization" },

      mainEntity: items.map(({ q, a }) => ({

        "@type": "Question",

        name: q,

        acceptedAnswer: { "@type": "Answer", text: a },

      })),

    },

    null,

    2

  );

}



function buildArticleSchema(data) {

  if (!data.canonical || !data.articlePublishedTime) return undefined;

  const locale = data.locale === "en" ? "en" : "zh-HK";

  const authorName = locale === "en" ? "Dr Ng Hau Chun" : "伍厚臻";

  return JSON.stringify(

    {

      "@context": "https://schema.org",

      "@type": "Article",

      "@id": data.canonical + "#article",

      headline: data.title,

      description: data.description,

      url: data.canonical,

      datePublished: data.articlePublishedTime,

      dateModified: data.articlePublishedTime,

      author: { "@type": "Person", name: authorName },

      publisher: { "@id": "https://oakvilles.com/#organization" },

      image: data.ogImage || "https://oakvilles.com/images/og/og-default.png",

      inLanguage: locale,

      ...(data.articleSection ? { articleSection: data.articleSection } : {}),

    },

    null,

    2

  );

}



function normalizeStem(data) {

  const stem = data.page && data.page.filePathStem;

  if (!stem) return "";

  return stem.replace(/^\//, "");

}



function resolveSchema(data) {

  if (data.schema) return data.schema;

  const stem = normalizeStem(data);

  if (stem === "faq") {

    return buildFaqSchema(

      FAQ_ITEMS.zh,

      data.canonical || "https://oakvilles.com/faq.html",

      "zh"

    );

  }

  if (stem === "en/faq") {

    return buildFaqSchema(

      FAQ_ITEMS.en,

      data.canonical || "https://oakvilles.com/en/faq.html",

      "en"

    );

  }

  if (stem.startsWith("blog/") && stem !== "blog/index") {

    return buildArticleSchema(data);

  }

  if (stem.startsWith("en/blog/") && stem !== "en/blog/index") {

    return buildArticleSchema(data);

  }

  if (stem.startsWith("conditions/") && stem !== "conditions/central-hk") {

    return buildMedicalWebPageSchema(data, conditionSpecialty(stem));

  }

  if (stem.startsWith("en/conditions/")) {

    return buildMedicalWebPageSchema(data, conditionSpecialty(stem));

  }

  return undefined;

}



function loadImageManifest() {

  try {

    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));

  } catch {

    return {};

  }

}



function buildPictureTag(src, attrs, manifest) {

  const entry = manifest[src];

  if (!entry || !entry.webp || !entry.webp.length) return null;



  const srcset = entry.webp.map((v) => `${v.url} ${v.width}w`).join(", ");

  const sizes = entry.sizes || "(max-width: 768px) 100vw, 1200px";

  const imgAttrs = attrs.replace(/\s*\/?\s*$/, "");



  return (

    `<picture>` +

    `<source type="image/webp" srcset="${srcset}" sizes="${sizes}">` +

    `<img ${imgAttrs} src="${src}">` +

    `</picture>`

  );

}



function buildPermalink(data) {

  if (data.permalink) return data.permalink;

  let stem = String(data.page.filePathStem).replace(/\\/g, "/").replace(/^\/+/, "");

  let prefix = "";

  if (stem.startsWith("en/")) {

    prefix = "/en";

    stem = stem.slice(3);

  }

  if (stem === "index") return `${prefix}/index.html`;

  return `${prefix}/${stem}.html`;

}



function resolveLocale(data) {
  if (data.lang === "en") return "en";
  const stem = data.page && data.page.filePathStem ? String(data.page.filePathStem).replace(/\\/g, "/").replace(/^\/+/, "") : "";
  if (stem === "en" || stem.startsWith("en/")) return "en";
  return "zh";
}

const LANG_STEM_ALIAS = {
  "conditions/central-hk": "about/central-hk",
};

const LANG_DIR_INDEX = {
  "blog/index": "blog/",
  "news/index": "news/",
};

function normalizePageStem(fileStem) {
  let stem = String(fileStem).replace(/\\/g, "/").replace(/^\/+/, "");
  if (stem === "en") return "index";
  if (stem.startsWith("en/")) return stem.slice(3);
  return stem;
}

function langPathForStem(fileStem, targetLocale) {
  let stem = normalizePageStem(fileStem);
  if (LANG_STEM_ALIAS[stem]) stem = LANG_STEM_ALIAS[stem];

  const dirSlug = LANG_DIR_INDEX[stem];
  if (dirSlug) {
    return targetLocale === "en" ? `/en/${dirSlug}` : `/${dirSlug}`;
  }

  if (stem === "index") return targetLocale === "en" ? "/en/" : "/";
  return targetLocale === "en" ? `/en/${stem}.html` : `/${stem}.html`;
}

function buildLangAlternate(data) {
  const fileStem = data.page && data.page.filePathStem;
  if (!fileStem) return null;
  const targetLocale = resolveLocale(data) === "en" ? "zh" : "en";
  return langPathForStem(fileStem, targetLocale);
}



module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addPassthroughCopy({ "images/favicon.ico": "favicon.ico" });

  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addPassthroughCopy("vercel.json");



  eleventyConfig.addGlobalData("eleventyComputed", {

    permalink: buildPermalink,

    locale: (data) => resolveLocale(data),

    site: (data) => (resolveLocale(data) === "en" ? SITE_EN : SITE_ZH),

    langAlternate: buildLangAlternate,

    schema: resolveSchema,

    t: (data) => {

      const locale = resolveLocale(data);

      const i18n = data.i18n || require("./src/_data/i18n.json");

      return i18n[locale] || i18n.zh;

    },

  });



  eleventyConfig.addFilter("urlencode", (str) => encodeURIComponent(str || ""));

  eleventyConfig.addFilter("prefixUrl", (url, prefix) => {

    if (!url || url.startsWith("http") || url.startsWith("#")) return url;

    if (!prefix) return url;

    if (url === "/") return `${prefix}/`;

    return `${prefix}${url}`;

  });



  eleventyConfig.addTransform("webp-picture", function (content, outputPath) {

    if (!outputPath || !outputPath.endsWith(".html")) return content;



    const manifest = loadImageManifest();

    if (!Object.keys(manifest).length) return content;



    return content.replace(

      /<img([^>]*?)\ssrc="(\/images\/[^"]+\.(?:png|jpe?g))"([^>]*?)>/gi,

      (match, before, src, after) => {

        const attrs = `${before} ${after}`.replace(/\s+/g, " ").trim();

        const picture = buildPictureTag(src, attrs, manifest);

        return picture || match;

      }

    );

  });



  eleventyConfig.addTransform("relative-assets", function (content, outputPath) {

    if (!outputPath || !outputPath.endsWith(".html")) return content;



    const siteRoot = path.join(__dirname, "_site");

    const rel = path.relative(path.dirname(outputPath), siteRoot);

    const prefix =

      !rel || rel === "."

        ? ""

        : rel.split(path.sep).map(() => "..").join("/") + "/";



    return content

      .replace(/(\s(?:href|src|content)=")\/(css|js|images)\//g, `$1${prefix}$2/`)

      .replace(/(\shref=")\/site\.webmanifest"/g, `$1${prefix}site.webmanifest"`)

      .replace(/(<script[^>]+src=")\/(js)\//g, `$1${prefix}$2/`)

      .replace(/\ssrcset="([^"]+)"/g, (match, srcset) => {

        const rewritten = srcset.replace(/\/images\//g, `${prefix}images/`);

        return ` srcset="${rewritten}"`;

      });

  });



  return {

    dir: {

      input: "src",

      includes: "_includes",

      data: "_data",

      output: "_site",

    },

    htmlTemplateEngine: "njk",

    markdownTemplateEngine: "njk",

    templateFormats: ["html", "njk"],

  };

};

