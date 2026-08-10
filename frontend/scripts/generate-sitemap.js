/* eslint-disable no-console */
/**
 * Writes build/sitemap.xml and appends the Sitemap line to build/robots.txt.
 *
 * A sitemap has to carry absolute URLs, and this repo has no production domain
 * committed anywhere — so rather than ship a placeholder that would point
 * crawlers at the wrong host, this runs only when the domain is supplied:
 *
 *     REACT_APP_SITE_URL=https://rdbassociates.in yarn build
 *
 * Without it the build is unchanged and prints a note. It writes into build/
 * rather than public/ so nothing stale is ever committed.
 */
const fs = require("fs");
const path = require("path");

const SITE_URL = (process.env.REACT_APP_SITE_URL || "").trim().replace(/\/$/, "");
const BUILD_DIR = path.resolve(__dirname, "..", "build");

// Static routes, mirroring the <Route> list in src/App.js. Newsroom articles
// are added from the data module below.
const STATIC_ROUTES = [
  ["/", "1.0"],
  ["/about", "0.9"],
  ["/practice-areas", "0.9"],
  ["/expertise", "0.8"],
  ["/journey", "0.7"],
  ["/credentials", "0.7"],
  ["/work", "0.8"],
  ["/stages", "0.7"],
  ["/careers", "0.7"],
  ["/newsroom", "0.8"],
  ["/insights", "0.6"],
  ["/newsletter", "0.5"],
  ["/contact", "0.9"],
  ["/privacy", "0.3"],
];

function newsroomSlugs() {
  // The data module is ESM with a `@/` alias, so it is read as text and the
  // slugs pulled out rather than imported — this script runs in plain Node
  // before webpack exists.
  try {
    const src = fs.readFileSync(
      path.resolve(__dirname, "..", "src", "data", "newsroom.js"),
      "utf8",
    );
    return [...src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

if (!SITE_URL) {
  console.log(
    "[sitemap] REACT_APP_SITE_URL not set — skipping sitemap.xml.\n" +
      "[sitemap] Set it to the production origin to emit one, e.g.\n" +
      "[sitemap]   REACT_APP_SITE_URL=https://example.com yarn build",
  );
  process.exit(0);
}

if (!fs.existsSync(BUILD_DIR)) {
  console.log("[sitemap] No build/ directory — skipping.");
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...STATIC_ROUTES.map(([loc, priority]) => ({ loc, priority })),
  ...newsroomSlugs().map((slug) => ({ loc: `/newsroom/${slug}`, priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), xml);

const robotsPath = path.join(BUILD_DIR, "robots.txt");
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8").replace(/\n*Sitemap:.*$/gm, "");
  fs.writeFileSync(robotsPath, `${robots.trimEnd()}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

console.log(`[sitemap] Wrote ${urls.length} URLs for ${SITE_URL}`);

/**
 * Absolute social-card URLs in the built index.html.
 *
 * `og:image` shipped as the relative path `/ramandeep-bawa.jpg`. Open Graph
 * requires an absolute URL, so LinkedIn, WhatsApp, Slack and iMessage — none
 * of which run JavaScript, and all of which read this file rather than the
 * rendered page — resolved nothing and drew an imageless card. The runtime
 * hook in lib/useDocumentMeta.js writes the absolute form correctly, but it
 * writes it far too late for any of them.
 *
 * Stamped here, at build time, for the same reason the sitemap is: this is the
 * only point where the production origin is known. `og:url` gets the same
 * treatment so the canonical in the served HTML is absolute too.
 */
const indexPath = path.join(BUILD_DIR, "index.html");
if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, "utf8");
  const before = html;

  html = html.replace(
    /(<meta\s+property="og:image"\s+content=")(\/[^"]*)(")/g,
    (_, a, p, b) => `${a}${SITE_URL}${p}${b}`,
  );

  // og:url and a canonical are absent from the static head entirely; add them.
  if (!/property="og:url"/.test(html)) {
    html = html.replace(
      /(<meta\s+property="og:type"[^>]*>)/,
      `$1\n    <meta property="og:url" content="${SITE_URL}/" />`,
    );
  }
  if (!/rel="canonical"/.test(html)) {
    html = html.replace(
      /(<\/title>)/,
      `$1\n    <link rel="canonical" href="${SITE_URL}/" />`,
    );
  }

  if (html !== before) {
    fs.writeFileSync(indexPath, html);
    console.log("[sitemap] Rewrote social-card URLs in index.html to absolute.");
  }
}
