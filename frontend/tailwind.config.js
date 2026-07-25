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