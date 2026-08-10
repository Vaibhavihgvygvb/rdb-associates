// Chambers-level facts and assets shared across sections.
//
// The founding advocate's portrait is rendered in two places (the About section and
// the Team page). It lives here so a new photograph is a one-line change rather than
// a hunt through components — the previous copy was duplicated in both files and
// pointed at a third-party image host that could disappear without notice.
//
// The file sits in public/, so the path is served from the site root as-is.
export const PORTRAIT = "/ramandeep-bawa.jpg";

/**
 * Responsive WebP derivatives of the portrait.
 *
 * The JPEG above is 990×1150 and 317KB, and it was being sent at full weight
 * to every device — including a phone rendering it about 340px wide, which is
 * roughly five times the bytes that frame can use. These are the same image at
 * the three widths the layout actually asks for: 13KB, 40KB and 64KB.
 *
 * WebP without a JPEG fallback is deliberate — it has been supported by every
 * browser this site targets for years. The original JPEG stays on disk because
 * `og:image` still needs it: social crawlers are the one consumer that should
 * not be handed a WebP.
 */
export const PORTRAIT_SRCSET = [480, 720, 990]
  .map((w) => `/ramandeep-bawa-${w}.webp ${w}w`)
  .join(", ");

// Contact details, for the same reason: these were restated in the contact
// section, the footer, the newsroom's press block, the error page and the
// JSON-LD in index.html — five places to keep in step by hand, which is how a
// firm ends up publishing an old address on one page and a new one on another.
//
// Note on the address: the source gave it as "A-86, LGF, Defence Colony,
// Delhi-110024"; LGF is expanded to "Lower Ground Floor" to match the site's
// register, and the postal form follows the style already used elsewhere.
export const CHAMBERS_ADDRESS =
  "RDB Associates, A-86, Lower Ground Floor, Defence Colony, New Delhi – 110024, India";

/** Same address without the firm name, for structured data. */
export const CHAMBERS_STREET = "A-86, Lower Ground Floor, Defence Colony";
export const CHAMBERS_POSTAL_CODE = "110024";
export const CHAMBERS_LOCALITY = "New Delhi";

export const EMAIL = "chambersofrb@gmail.com";

/** Grouped for reading; PHONE_E164 is the dialable form for `tel:` links. */
export const PHONE_DISPLAY = "+91 97114 29298";
export const PHONE_E164 = "+919711429298";

export const HOURS = "Mon – Sat · 10:00 – 19:00 IST";
