import { useEffect } from "react";

/**
 * Per-route <title>, description, canonical and social-card tags.
 *
 * All fourteen routes used to share the single title and description baked
 * into public/index.html, so every page presented itself to a search result or
 * a shared link as the home page.
 *
 * This is deliberately a ~40-line effect rather than a helmet library: there
 * is one consumer (PageShell), nothing here needs to compose or nest, and the
 * tags are written straight to the live document.
 *
 * Note what this does and does not buy. It is correct for anything executing
 * JavaScript — every browser, and the crawlers that render. It does not help a
 * scraper that reads the initial HTML only, because this is a client-rendered
 * app and that HTML has an empty #root regardless of what happens here.
 * Fixing *that* means prerendering the routes at build time; this hook is the
 * half that is worth having either way, and is a prerequisite for the other
 * half rather than a substitute for it.
 */
const SITE_NAME = "RDB Associates";
const FALLBACK_DESCRIPTION =
  "The Chambers of Ramandeep Bawa — Advocate, High Court of Delhi. Civil, commercial, medical and cyber law litigation and advisory.";

/** Upserts a <meta> tag, keyed by `name` or `property`. */
function setMeta(keyAttr, keyValue, content) {
  let el = document.head.querySelector(`meta[${keyAttr}="${keyValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function useDocumentMeta(title, description) {
  useEffect(() => {
    // The home page is the one route whose title is the bare firm name; every
    // other page reads "<Page> | RDB Associates".
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const desc = description || FALLBACK_DESCRIPTION;

    // Origin is read at runtime rather than hardcoded so this stays correct
    // across preview deploys and the production domain alike.
    const url = `${window.location.origin}${window.location.pathname}`;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setCanonical(url);

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", `${window.location.origin}/ramandeep-bawa.jpg`);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", `${window.location.origin}/ramandeep-bawa.jpg`);
  }, [title, description]);
}

export { useDocumentMeta, SITE_NAME };
