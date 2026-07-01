const fs = require("fs");

const path = require("path");



const MANIFEST_PATH = path.join(__dirname, "src", "_data", "responsive-images.json");

const SITE_ZH = require("./src/_data/site.json");

const SITE_EN = require("./src/_data/site-en.json");

const GEO = require("./src/_data/geo.json");



function resolveSiteUrl(fallback = SITE_ZH.url) {

  if (process.env.SITE_URL) {

    return process.env.SITE_URL.replace(/\/$/, "");

  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (vercelProd) {

    return `https://${vercelProd.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  }

  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {

    return `https://${vercelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  }

  return String(fallback || "https://oakvilles.com").replace(/\/$/, "");

}



const SITE_BASE_URL = resolveSiteUrl();
const ORG_ID = `${SITE_BASE_URL}/#organization`;



function rewriteToSiteUrl(url, base = SITE_BASE_URL) {

  if (!url) return url;

  const origin = String(base).replace(/\/$/, "");

  if (url.startsWith("/")) return `${origin}${url}`;

  if (url.startsWith("http://") || url.startsWith("https://")) {

    try {

      const parsed = new URL(url);

      return `${origin}${parsed.pathname}${parsed.search}${parsed.hash}`;

    } catch {

      return url;

    }

  }

  return `${origin}/${url.replace(/^\//, "")}`;

}



function withResolvedSite(site, locale = "zh") {

  const geoBase = locale === "en"

    ? {

        ...GEO,

        placename: GEO.placenameEn || GEO.placename,

        locality: GEO.localityEn || GEO.locality,

        administrativeArea: GEO.administrativeAreaEn || GEO.administrativeArea,

        streetAddress: GEO.streetAddressEn || GEO.streetAddress,

        nearbyTransit: GEO.nearbyTransitEn || GEO.nearbyTransit,

      }

    : GEO;

  return {

    ...site,

    url: SITE_BASE_URL,

    defaultOgImage: rewriteToSiteUrl(site.defaultOgImage),

    geo: { ...geoBase, ...(site.geo || {}) },

  };

}



function buildPostalAddress(site, locale) {

  const g = site.geo || GEO;

  return {

    "@type": "PostalAddress",

    streetAddress: locale === "en" ? (g.streetAddressEn || g.streetAddress) : g.streetAddress,

    addressLocality: locale === "en" ? (g.localityEn || g.locality) : g.locality,

    addressRegion: locale === "en" ? (g.administrativeAreaEn || g.administrativeArea) : g.administrativeArea,

    addressCountry: g.countryCode || "HK",

    ...(g.postalCode ? { postalCode: g.postalCode } : {}),

  };

}



function buildGeoSchema(data, site) {

  const locale = resolveLocale(data) === "en" ? "en" : "zh";

  const stem = normalizeStem(data);

  const isHome = stem === "index" || stem === "en";

  const g = site.geo || GEO;

  const place = {

    "@type": "Place",

    "@id": `${SITE_BASE_URL}/#place`,

    name: locale === "en" ? `${site.nameEn || site.name} · Central Clinic` : "頤安本草 · 中環本草養康診所",

    geo: {

      "@type": "GeoCoordinates",

      latitude: parseFloat(g.latitude),

      longitude: parseFloat(g.longitude),

    },

    address: buildPostalAddress(site, locale),

    containedInPlace: {

      "@type": "City",

      name: locale === "en" ? "Hong Kong" : "香港",

    },

    ...(site.googleMaps && site.googleMaps.shortUrl ? { hasMap: site.googleMaps.shortUrl } : {}),

  };

  const graph = [place];

  if (isHome) {

    graph.push({

      "@type": "WebSite",

      "@id": `${SITE_BASE_URL}/#website`,

      url: `${SITE_BASE_URL}/`,

      name: site.name,

      inLanguage: ["zh-HK", "en"],

      publisher: { "@id": ORG_ID },

    });

  } else {

    graph.push({

      "@type": "MedicalBusiness",

      "@id": ORG_ID,

      name: site.name,

      url: `${SITE_BASE_URL}/`,

      telephone: site.telephone,

      geo: place.geo,

      address: place.address,

      areaServed: (site.serviceArea || []).map((name) => ({

        "@type": "AdministrativeArea",

        name,

      })),

    });

  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);

}

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

      "@id": rewriteToSiteUrl(data.canonical) + "#webpage",

      url: rewriteToSiteUrl(data.canonical),

      name: data.title,

      description: data.description,

      isPartOf: { "@id": ORG_ID },

      about: { "@id": ORG_ID },

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

      isPartOf: { "@id": ORG_ID },

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

  const authorName = locale === "en" ? "Dr. Ng Hau Jun" : "伍厚臻";

  return JSON.stringify(

    {

      "@context": "https://schema.org",

      "@type": "Article",

      "@id": rewriteToSiteUrl(data.canonical) + "#article",

      headline: data.title,

      description: data.description,

      url: rewriteToSiteUrl(data.canonical),

      datePublished: data.articlePublishedTime,

      dateModified: data.articlePublishedTime,

      author: { "@type": "Person", name: authorName },

      publisher: { "@id": ORG_ID },

      image: rewriteToSiteUrl(data.ogImage || "/images/og/og-default.png"),

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

  if (stem.startsWith("news/") && stem !== "news/index") {

    return buildArticleSchema(data);

  }

  if (stem.startsWith("en/news/") && stem !== "en/news/index") {

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
  eleventyConfig.addPassthroughCopy("fonts");

  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addPassthroughCopy({ "images/favicon.ico": "favicon.ico" });

  eleventyConfig.addPassthroughCopy("vercel.json");



  eleventyConfig.addGlobalData("eleventyComputed", {

    permalink: buildPermalink,

    locale: (data) => resolveLocale(data),

    site: (data) =>

      withResolvedSite(resolveLocale(data) === "en" ? SITE_EN : SITE_ZH, resolveLocale(data)),

    langAlternate: buildLangAlternate,

    schema: resolveSchema,

    geoSchema: (data) => {

      const site = withResolvedSite(resolveLocale(data) === "en" ? SITE_EN : SITE_ZH, resolveLocale(data));

      return buildGeoSchema(data, site);

    },

    t: (data) => {

      const locale = resolveLocale(data);

      const i18n = data.i18n || require("./src/_data/i18n.json");

      return i18n[locale] || i18n.zh;

    },

  });



  eleventyConfig.addFilter("urlencode", (str) => encodeURIComponent(str || ""));

  eleventyConfig.addFilter("isoDate", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("sitemapPriority", (page) => {
    const canonical = page.data.canonical || "";
    const stem = page.data.page && page.data.page.filePathStem
      ? String(page.data.page.filePathStem).replace(/\\/g, "/").replace(/^\/+/, "")
      : "";
    if (page.data.priority) return page.data.priority;
    if (canonical.endsWith("oakvilles.com/") || canonical.endsWith("/en/") || stem === "index" || stem === "en") return "1.0";
    if (stem === "about/central-hk" || stem === "en/about/central-hk") return "0.9";
    if (stem === "conditions/acne-eczema-central" || stem === "en/conditions/acne-eczema-central") return "0.9";
    if (stem === "contact" || stem === "en/contact" || stem === "clinic" || stem === "en/clinic") return "0.85";
    if (stem === "services" || stem === "en/services") return "0.85";
    if (stem === "about" || stem === "en/about" || stem === "process" || stem === "en/process") return "0.85";
    if (stem.startsWith("conditions/") || stem.startsWith("en/conditions/")) return "0.8";
    if (stem.startsWith("services/") || stem.startsWith("en/services/")) return "0.8";
    if (stem.startsWith("blog/") || stem.startsWith("en/blog/") || stem.startsWith("news/") || stem.startsWith("en/news/")) {
      if (stem.endsWith("/index") || stem === "blog" || stem === "en/blog" || stem === "news" || stem === "en/news") return "0.75";
      return "0.65";
    }
    if (stem === "faq" || stem === "en/faq") return "0.7";
    return "0.7";
  });

  eleventyConfig.addFilter("sitemapChangefreq", (page) => {
    if (page.data.changefreq) return page.data.changefreq;
    const stem = page.data.page && page.data.page.filePathStem
      ? String(page.data.page.filePathStem).replace(/\\/g, "/").replace(/^\/+/, "")
      : "";
    if (stem === "index" || stem === "en" || stem === "en/index") return "weekly";
    if (stem.startsWith("news/") || stem.startsWith("en/news/")) return "weekly";
    return "monthly";
  });

  eleventyConfig.addFilter("sitemapPages", (collection) => {
    const skipPermalinks = new Set(["/sitemap.xml", "/robots.txt", "/llms.txt"]);
    return collection
      .filter((page) => page.data.layout !== "layouts/redirect.njk")
      .filter((page) => page.data.noindex !== true)
      .filter((page) => !skipPermalinks.has(page.data.permalink))
      .sort((a, b) => {
        const priority = (p) => parseFloat(eleventyConfig.getFilter("sitemapPriority")(p) || "0");
        const diff = priority(b) - priority(a);
        if (diff !== 0) return diff;
        const locA = String(a.data.canonical || "");
        const locB = String(b.data.canonical || "");
        return locA.localeCompare(locB);
      });
  });

  eleventyConfig.addFilter("sitemapAlternates", (page, baseUrl) => {
    const fileStem = page.data.page && page.data.page.filePathStem;
    if (!fileStem) return {};
    const origin = String(baseUrl || SITE_BASE_URL).replace(/\/$/, "");
    const toAbs = (path) => rewriteToSiteUrl(path.startsWith("/") ? path : `/${path}`, origin);
    return {
      zh: toAbs(langPathForStem(fileStem, "zh")),
      en: toAbs(langPathForStem(fileStem, "en")),
    };
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => rewriteToSiteUrl(url, base || SITE_BASE_URL));

  eleventyConfig.addFilter("rewriteSchemaUrls", (jsonStr, base) => {
    if (!jsonStr || typeof jsonStr !== "string") return jsonStr;
    const origin = String(base || SITE_BASE_URL).replace(/\/$/, "");
    return jsonStr.replace(/https?:\/\/oakvilles\.com(\/[^"'\s]*)/g, (match) =>
      rewriteToSiteUrl(match, origin)
    );
  });

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

