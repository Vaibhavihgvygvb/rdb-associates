// The people of the chambers.
//
// This is the single record for each member: the /about team grid reads it,
// /team/<slug> renders it in full, and scripts/generate-sitemap.js pulls the
// slugs from it. Adding an advocate is one entry here and nothing else.
//
// The field names follow the chambers' own associate intake form, so a
// completed form maps onto this object field by field rather than being
// translated by whoever happens to be editing. Every field except `name`,
// `role` and `slug` is optional: a section with nothing in it does not render,
// which is what lets someone be listed the day they join and filled in as
// details arrive.
//
// Full shape — the optional fields correspond to the form's sections D, F, G,
// H and I, and each renders as its own section on the profile page:
//
//   slug, name, role, since, tagline, image, linkedin
//   enrolment   { council, number, year }
//   bio         [paragraph, …]
//   practices   [str]   forums [str]   languages [str]   memberships [str]
//   education   [{ qualification, institution, year }]
//   experience  { years, previous: [{ firm, period }] }
//   recognition [str]   publications [{ title, where, year }]
//   speaking    [{ title, where, year }]
//   related     [{ to, label }]
//
// Matters are not listed here. Where the newsroom credits an advocate by name
// those items surface on the profile automatically — see itemsByCounsel in
// data/newsroom.js — so a matter is recorded once, in one place.
//
// Two standing rules for this file, both of which matter more here than in
// most content:
//
//   1. Nothing goes in that the chambers cannot evidence. These are public
//      professional claims about named advocates, made on a site governed by
//      Bar Council of India Rule 36. An overstated forum or an unearned
//      qualification is not a typo.
//   2. Facts that already live elsewhere on the site are linked, not copied.
//      The founding advocate has /about, /journey and /credentials; his entry
//      summarises and points there rather than restating, so the two cannot
//      drift apart.

import { PORTRAIT, PORTRAIT_SRCSET } from "@/data/chambers";

export const MEMBERS = [
  {
    slug: "ramandeep-bawa",
    name: "Ramandeep Bawa",
    role: "Founding Advocate",
    since: 2013,
    image: { src: PORTRAIT, srcSet: PORTRAIT_SRCSET, objectPosition: "top" },
    linkedin: "https://www.linkedin.com/in/ramandeep-bawa-6081b6155/",

    // Taken from /about, where this already describes the practice.
    tagline: "Measured, meticulous and deeply client-centric — less noise, more counsel.",

    enrolment: { council: "Bar Council of Delhi" },

    // Short by design. The long-form account is /about and /journey; see rule 2
    // in the header comment.
    bio: [
      "Ramandeep Bawa is a litigating advocate based in New Delhi and the founder of RDB Associates. He practises principally before the High Court of Delhi, and appears before District Courts and specialised tribunals across India.",
      "He trained under Senior Advocate Ajay Burman from 2011 and moved to independent practice in 2013. He leads every mandate the chambers accepts personally.",
    ],

    practices: [
      "Civil Litigation",
      "Commercial Litigation",
      "Medical Law & Ethics",
      "Cyber Law",
    ],

    forums: [
      "High Court of Delhi",
      "District Courts, Delhi",
      "Tribunals across India",
    ],

    education: [
      { qualification: "B.A. LL.B", institution: "National Law School of India University (NLSIU)" },
      { qualification: "PG Diploma · Medical Law & Ethics", institution: "NLSIU", year: "2022" },
      { qualification: "Diploma · Alternative Dispute Resolution", institution: "Indian Law Institute", year: "2022" },
      { qualification: "Diploma · Cyber Laws", institution: "Government Law College, Mumbai", year: "2012" },
    ],

    memberships: [
      "Bar Council of India",
      "Bar Council of Delhi",
      "Delhi High Court Bar Association",
      "Indian Lawyers Association",
    ],

    languages: ["English", "Hindi", "Punjabi", "Japanese (Working)"],

    experience: {
      previous: [{ firm: "Chambers of Senior Advocate Ajay Burman", period: "2011–2013" }],
    },

    recognition: [],
    publications: [],
    speaking: [],

    // Cross-links to the pages that carry this advocate's detail already.
    related: [
      { to: "/journey", label: "The journey" },
      { to: "/credentials", label: "Credentials in full" },
      { to: "/about", label: "About the advocate" },
    ],
  },

  {
    slug: "gaurang-bhalotia",
    name: "Gaurang Bhalotia",
    role: "Associate",
    since: 2026,

    // No photograph supplied yet. Both the grid card and the profile page fall
    // back to a monogram, so this can stay null until one is taken — then put
    // the file in public/ and set `image: { src: "/gaurang-bhalotia.jpg" }`.
    // scripts/optimise-images.mjs generates the responsive WebP set the
    // founding advocate's portrait uses.
    image: null,

    enrolment: {
      council: "Bar Council of Delhi",
      number: "D/10577/2026",
      year: "2026",
    },

    // PENDING SIGN-OFF — do not publish as written without confirming it.
    //
    // The text supplied describes appearances before the Supreme Court of
    // India, the High Court of Delhi, the High Court of Uttarakhand and the
    // NCLT/NCLAT, and advisory work under the IBC and SARFAESI, for an
    // advocate enrolled in 2026 whose LL.B. completed the same year. It also
    // names practice areas (matrimonial, arbitration, insolvency, consumer)
    // that the same intake form did not list among his areas of practice.
    //
    // Where that exposure came from internships or work as a junior it is
    // worth describing, but not in the language of having represented clients
    // personally. Rule 36 makes an overstated claim on a chambers website a
    // professional risk, not an editing preference. Settle the wording with
    // the advocate before this page goes live, and trim `forums` below to
    // match whatever is agreed.
    bio: [
      "Gaurang Bhalotia is an advocate with the chambers, practising in civil, criminal and commercial litigation.",
      "He read law at Campus Law Centre, University of Delhi, following a degree in Political Science at Ramjas College, and was enrolled with the Bar Council of Delhi in 2026.",
    ],

    practices: ["Civil Litigation", "Criminal Litigation", "Commercial Litigation"],

    // Deliberately empty pending the sign-off described above.
    forums: [],

    education: [
      { qualification: "LL.B", institution: "Campus Law Centre, University of Delhi", year: "2023–2026" },
      { qualification: "B.A. (Hons) Political Science", institution: "Ramjas College, University of Delhi", year: "2019–2022" },
    ],

    // Sections F through I of the intake form came back blank. Each stays
    // empty until it can be filled with something the chambers can evidence;
    // an empty section does not render.
    memberships: [],
    languages: [],
    experience: null,
    recognition: [],
    publications: [],
    speaking: [],
    related: [],
  },
];

export const getMember = (slug) => MEMBERS.find((m) => m.slug === slug);

/** Everyone but the founding advocate, in joining order — the /about grid. */
export const associates = () => MEMBERS.filter((m) => m.role !== "Founding Advocate");

export const founder = () => MEMBERS.find((m) => m.role === "Founding Advocate");

/** "Gaurang Bhalotia" -> "GB". The fallback when no photograph exists yet. */
export const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

/** One line under the name, wherever the member is summarised. */
export const memberSummary = (m) =>
  m.practices?.length ? m.practices.join(" · ") : m.role;
