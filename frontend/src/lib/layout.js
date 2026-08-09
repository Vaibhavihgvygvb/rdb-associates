/**
 * Layout constants that both CSS and JS need.
 *
 * The fixed header is 72px tall. Tailwind gets that as the `nav` spacing token
 * (see tailwind.config.js) so markup can say `h-nav` / `pt-nav` / `top-nav`;
 * this is the same number for the code that needs it as a value — currently
 * Lenis' anchor offset, which has to clear the header when a `#hash` link
 * scrolls. Change both together.
 */
export const NAV_HEIGHT = 72;
