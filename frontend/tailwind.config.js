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
        sage: {
          DEFAULT: "#4A5D45",
          light: "#5F7358",
          deep: "#33422E",
        },
        brown: {
          DEFAULT: "#6F4E37",
          light: "#8B5E3C",
          soft: "#C9AF8B",
        },
        cream: {
          DEFAULT: "#FFFFFF",
          dark: "#F6F5F1",
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