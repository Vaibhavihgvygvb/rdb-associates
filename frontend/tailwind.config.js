/** @type {import('tailwindcss').Config} */
module.exports = {
  // `darkMode: ["class"]` removed along with the `borderRadius` scale below.
  // Neither had a single consumer: there is not one `dark:` variant in the
  // codebase, and `rounded-lg` / `rounded-md` / `rounded-sm` — the only three
  // utilities the radius scale fed — appear nowhere. Configuration that
  // describes capabilities the site does not use is a claim the code cannot
  // support, and the next person to read it has to prove that themselves.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        // "serif" token repurposed as the display face (used by all headings).
        serif: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        // Dark sections (footer, hero overlay, accent blocks) — neutral near-black.
        sage: {
          DEFAULT: "#121212",
          light: "#1E1E1E",
          deep: "#0A0A0A",
        },
        // Accent — emerald (links, CTAs, eyebrows, detail lines).
        brown: {
          DEFAULT: "#007A5A",
          light: "#005C43",
          soft: "#EAF5F1",
          // The default emerald is tuned for white: it reaches 5.34:1 there but
          // only 3.71:1 on sage-deep and 3.51:1 on sage, so it fails AA as text
          // on every dark surface. `on-dark` is the same hue lifted to 5.81:1
          // against sage-deep. Use it for emerald *text* on dark; the DEFAULT
          // stays correct for emerald text on light and for rules and fills,
          // which carry no contrast requirement.
          "on-dark": "#0E9E75",
        },
        // Light surfaces — white + light gray. Also white text on dark.
        cream: {
          DEFAULT: "#FFFFFF",
          dark: "#F5F5F4",
        },
        // Readable text on light surfaces — near-black ink + muted gray.
        ink: {
          DEFAULT: "#1F1F1F",
          soft: "#666666",
        },
        border: "hsl(var(--border))",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up":
           "fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      letterSpacing: {
        "widest-plus": "0.28em",
      },
      spacing: {
        // Height of the fixed header. Every page offset, the sticky newsroom
        // filter bar and the hero's viewport calc read from this rather than
        // restating 72px — eleven pages used to reserve `pt-20` (80px) against
        // a 72px bar. Keep in step with NAV_HEIGHT in src/lib/layout.js, which
        // is the same number for the code that needs it as a JS value.
        nav: "72px",
      },
    },
  },
  plugins: [],
};