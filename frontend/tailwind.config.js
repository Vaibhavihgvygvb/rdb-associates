/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // Dark section surfaces (nav, hero, footer, panels) — deep ink navy.
        sage: {
          DEFAULT: "#152439",
          light: "#20334F",
          deep: "#0E1A2C",
        },
        // Accent — brass / gold. Decorative only; never body text on light.
        brown: {
          DEFAULT: "#B08D57",
          light: "#C6A472",
          soft: "#DBC7A4",
        },
        // Light surfaces + text on dark sections — warm ivory / clean white.
        cream: {
          DEFAULT: "#F8F6F0",
          dark: "#ECE8DE",
        },
        // Readable text on light surfaces — near-black navy ink.
        ink: {
          DEFAULT: "#1A2438",
          soft: "#4C566B",
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