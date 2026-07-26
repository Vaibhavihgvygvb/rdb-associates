// Chambers-level assets shared across sections.
//
// The founding advocate's portrait is rendered in two places (the About section and
// the Team page). It lives here so a new photograph is a one-line change rather than
// a hunt through components — the previous copy was duplicated in both files and
// pointed at a third-party image host that could disappear without notice.
//
// The file sits in public/, so the path is served from the site root as-is.
export const PORTRAIT = "/ramandeep-bawa.jpg";
