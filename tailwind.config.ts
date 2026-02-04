import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        ocean: "rgb(var(--ocean) / <alpha-value>)",
        sun: "rgb(var(--sun) / <alpha-value>)",
        copper: "rgb(var(--copper) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
        sand: "rgb(var(--sand) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        pine: "rgb(var(--pine) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        display: ["var(--font-display)", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(15, 23, 42, 0.45)",
        glow: "0 20px 40px -20px rgba(14, 116, 144, 0.45)",
        raised: "0 18px 45px -35px rgba(15, 23, 42, 0.55)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" }
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.03)", opacity: "1" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
