// Site search index.
//
// Everything reachable from the nav, plus every newsroom item, flattened into one
// list of { title, to, group, blurb, meta, keywords } records. Practice areas are
// imported from the newsroom taxonomy rather than restated, so the two cannot drift.
//
// Ranking is deliberately simple — a few dozen records do not need a search engine.
// All query tokens must match somewhere (AND), and a match in the title outranks a
// match in the body text.

import { ITEMS, PRACTICES, categoryLabel, formatDate } from "@/data/newsroom";

const PAGES = [
  { title: "About the Advocate", to: "/about", blurb: "Background, training and approach of the founding advocate.", keywords: "ramandeep bawa founder profile portrait biography nlsiu" },
  { title: "Practice Areas", to: "/practice-areas", blurb: "The areas of law the chambers practises in.", keywords: "services capabilities litigation advisory" },
  { title: "Expertise", to: "/expertise", blurb: "Skills the chambers brings to a mandate.", keywords: "capabilities skills strengths" },
  { title: "Journey", to: "/journey", blurb: "The chambers' timeline and milestones.", keywords: "timeline history milestones career path" },
  { title: "Credentials", to: "/credentials", blurb: "Enrolment, qualifications and memberships.", keywords: "qualifications degrees diplomas bar council enrolment memberships awards" },
  { title: "Our Work", to: "/work", blurb: "Representative matters, described generally.", keywords: "cases matters experience track record" },
  { title: "Stages of a Matter", to: "/stages", blurb: "What to expect at each stage of a proceeding.", keywords: "process procedure what to expect steps how it works" },
  { title: "Careers", to: "/careers", blurb: "Openings for advocates, associates and interns.", keywords: "jobs hiring recruitment internship vacancies apply join" },
  { title: "Newsroom", to: "/newsroom", blurb: "Matter notes, publications, speaking and recognition.", keywords: "news updates announcements press media" },
  { title: "Insights", to: "/insights", blurb: "Commentary and analysis from the chambers.", keywords: "articles writing commentary analysis blog" },
  { title: "Newsletter", to: "/newsletter", blurb: "Subscribe for updates from the chambers.", keywords: "subscribe mailing list email updates" },
  { title: "Contact", to: "/contact", blurb: "Request a consultation with the chambers.", keywords: "consultation enquiry appointment address chamber phone email reach delhi high court" },
];

// Mirrors the Expertise section's list.
const EXPERTISE = [
  "Courtroom Advocacy",
  "Trial Strategy",
  "Legal Drafting",
  "Litigation Management",
  "Legal Research",
  "Dispute Resolution",
];

export const ENTRIES = [
  ...PAGES.map((p) => ({ ...p, group: "Page" })),
  ...PRACTICES.map((name) => ({
    title: name,
    to: "/practice-areas",
    group: "Practice area",
    blurb: "Practice area of the chambers.",
    keywords: "practice area service",
  })),
  ...EXPERTISE.map((name) => ({
    title: name,
    to: "/expertise",
    group: "Expertise",
    blurb: "Expertise the chambers brings to a mandate.",
    keywords: "expertise skill capability",
  })),
  ...ITEMS.map((i) => ({
    title: i.title,
    to: `/newsroom/${i.slug}`,
    group: "Newsroom",
    blurb: i.summary,
    meta: `${categoryLabel(i.category)} · ${formatDate(i.date)}`,
    keywords: [categoryLabel(i.category), i.forum, ...i.practices].join(" "),
  })),
];

// Shown before anything has been typed.
export const SUGGESTIONS = ["Contact", "Newsroom", "Practice Areas", "Our Work", "Careers"]
  .map((t) => ENTRIES.find((e) => e.title === t))
  .filter(Boolean);

// The query is user input and reaches a RegExp below, so it must be escaped.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function score(entry, tokens) {
  const title = entry.title.toLowerCase();
  const haystack = [entry.title, entry.blurb, entry.meta, entry.keywords, entry.group]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let total = 0;
  for (const t of tokens) {
    if (!haystack.includes(t)) return 0; // every token has to land somewhere
    if (title.startsWith(t)) total += 6;
    else if (new RegExp(`\\b${escapeRe(t)}`).test(title)) total += 4;
    else if (title.includes(t)) total += 2;
    else total += 1;
  }
  return total;
}

export function search(query, limit = 12) {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  return ENTRIES.map((entry) => ({ entry, s: score(entry, tokens) }))
    .filter((r) => r.s > 0)
    // Ties break toward the shorter title: the more specific record of two equal
    // matches is almost always the one the reader meant.
    .sort((a, b) => b.s - a.s || a.entry.title.length - b.entry.title.length)
    .slice(0, limit)
    .map((r) => r.entry);
}
