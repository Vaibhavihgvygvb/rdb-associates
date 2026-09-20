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
//   practiceDetail [{ area, items: [str] }]   — optional breakdown of the
//               practices above; supply it and the profile lists each area's
//               work in full instead of showing the practices as plain tags
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

    // Supplied photograph, run through scripts/optimise-images.mjs. Only one
    // width: the original is 360×450, so the larger derivatives the other
    // portraits carry would be upscaled pixels at three times the bytes. The
    // frame it fills is about 320px wide, which this covers at 1x but not on
    // a retina screen — worth re-shooting at 990px when there is a chance to,
    // and re-running the script to get the full set.
    image: {
      src: "/gaurang-bhalotia-360.webp",
      srcSet: "/gaurang-bhalotia-360.webp 360w",
      objectPosition: "top",
    },

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

  {
    slug: "amit-singh",
    name: "Amit Singh",
    role: "Advocate",

    // Supplied photograph at 973×1175, through scripts/optimise-images.mjs.
    image: {
      src: "/amit-singh-973.webp",
      srcSet: "/amit-singh-480.webp 480w, /amit-singh-720.webp 720w, /amit-singh-973.webp 973w",
      objectPosition: "top",
    },

    // The council and year are read off the enrolment number — a D/ prefix is
    // the Bar Council of Delhi and the trailing four digits are the year of
    // enrolment. That is how the number is formed, but it is an inference
    // rather than something the chambers has been handed: confirm both
    // against the enrolment certificate before treating them as verified.
    enrolment: {
      council: "Bar Council of Delhi",
      number: "D/542/2012",
      year: "2012",
    },

    tagline: "Thorough preparation, practical legal advice and effective courtroom advocacy.",

    bio: [
      "Amit Singh is a practising advocate with experience in civil and criminal litigation, along with matters relating to consumer disputes and motor vehicle claims. His practice involves representation and legal assistance across a range of contentious matters, with particular focus on effective courtroom advocacy, case preparation and strategic handling of litigation.",
      "He regularly handles matters involving civil disputes, criminal proceedings, consumer complaints and motor vehicle-related claims, including proceedings arising from accidents, compensation claims and related legal issues.",
      "His practice encompasses the complete litigation process, including case assessment, drafting and pleadings, preparation of legal submissions, evidence and documentation, court appearances, arguments and conduct of proceedings before the appropriate judicial and quasi-judicial forums.",
      "With a litigation-oriented approach, he focuses on understanding the factual and legal issues involved in each matter and developing a case strategy suited to the client's objectives. His practice is centred on strong preparation, detailed appreciation of facts and documents, and effective courtroom representation, examining each matter from both its factual and legal dimensions.",
    ],

    practices: [
      "Civil Litigation",
      "Criminal Litigation",
      "Consumer Disputes",
      "Motor Vehicle Matters",
    ],

    practiceDetail: [
      {
        area: "Civil Litigation",
        items: [
          "Property and ownership disputes",
          "Recovery and contractual disputes",
          "Injunction and declaration matters",
          "Civil suits and related proceedings",
        ],
      },
      {
        area: "Criminal Litigation",
        items: [
          "Criminal complaints and proceedings",
          "Bail and related applications",
          "Defence in criminal matters",
          "Trial and appellate proceedings",
        ],
      },
      {
        area: "Consumer Disputes",
        items: [
          "Consumer complaints",
          "Deficiency in service and unfair trade practice matters",
          "Insurance and service-related disputes",
          "Consumer appeals and related proceedings",
        ],
      },
      {
        area: "Motor Vehicle Matters",
        items: [
          "Motor accident claims",
          "Compensation proceedings",
          "Motor vehicle-related disputes",
          "Claims arising from road accidents and insurance matters",
        ],
      },
    ],

    // The profile supplied names no court or tribunal — it describes "the
    // appropriate judicial and quasi-judicial forums" and nothing more
    // specific. Naming the forums would be the chambers' claim, not his, so
    // this stays empty until he confirms where he in fact appears. Same for
    // the sections below: none of it was supplied, and an empty section does
    // not render.
    forums: [],
    education: [],
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
