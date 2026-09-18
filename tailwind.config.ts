/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae3",
          300: "#b0b9ca",
          400: "#8593ac",
          500: "#667690",
          600: "#515f77",
          700: "#434d61",
          800: "#3a4252",
          900: "#343946",
          950: "#22262f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(34, 38, 47, 0.18)",
      },
      backgroundImage: {
        "hero-light":
          "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(249,115,22,0.22), transparent), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(194,65,12,0.12), transparent), linear-gradient(160deg, #fff7ed 0%, #ffffff 45%, #eceef2 100%)",
        "hero-dark":
          "radial-gradient(ellipse 80% 60% at 70% 15%, rgba(249,115,22,0.28), transparent), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(194,65,12,0.18), transparent), linear-gradient(165deg, #1a1410 0%, #22262f 50%, #0f1115 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 4s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out 1.5s infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
