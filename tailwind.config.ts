import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0FAFB",
          100: "#DBF1F3",
          200: "#BAE3E7",
          300: "#8ACED5",
          400: "#52AFB9",
          500: "#2A929D",
          600: "#006D77",
          700: "#015A63",
          800: "#064951",
          900: "#0A3C44",
          950: "#02262C",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)",
        ring: "0 0 0 1px rgba(15,23,42,0.06), 0 12px 40px rgba(0,109,119,0.12)",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      animation: {
        "fade-up": "fadeUp 600ms ease-out both",
        "fade-in": "fadeIn 500ms ease-out both",
        marquee: "marquee 40s linear infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-ring": "pulseRing 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 18s linear infinite",
        "draw-line": "drawLine 1200ms ease-out both",
        "bar-grow": "barGrow 900ms cubic-bezier(0.22,1,0.36,1) both",
        "card-pop": "cardPop 500ms cubic-bezier(0.22,1,0.36,1) both",
        shimmer: "shimmer 2.4s linear infinite",
        "border-spin": "borderSpin 6s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "70%, 100%": { transform: "scale(1.8)", opacity: "0" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "100%" },
          "100%": { strokeDashoffset: "0" },
        },
        barGrow: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        cardPop: {
          "0%": { transform: "translateY(8px) scale(0.98)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        borderSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
