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
        navy: {
          DEFAULT: "#0A192F",
          light: "#112240",
          deep: "#050D1C",
        },
        gold: {
          DEFAULT: "#C5A059",
          light: "#D4AF37",
          soft: "#E8D9B0",
        },
        cream: {
          DEFAULT: "#FAF9F6",
          dark: "#F2EFE7",
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