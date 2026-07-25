/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        // "serif" token repurposed as the display face (used by all headings).
        serif: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        // Dark sections (footer, hero overlay, accent blocks) — near-black.
        sage: {
          DEFAULT: "#12151A",
          light: "#20242B",
          deep: "#0A0C0F",
        },
        // Accent — corporate blue (links, CTAs, eyebrows, detail lines).
        brown: {
          DEFAULT: "#0B57D0",
          light: "#2E74E8",
          soft: "#9DBEF2",
        },
        // Light surfaces — white + light gray. Also white text on dark.
        cream: {
          DEFAULT: "#FFFFFF",
          dark: "#F4F5F7",
        },
        // Readable text on light surfaces — near-black ink + muted gray.
        ink: {
          DEFAULT: "#15181C",
          soft: "#565C66",
        },
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};