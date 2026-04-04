import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Peru Frost Official Palette
        base: "#0A0F1F",        // Base Nocturna
        midnight: "#1A2238",    // Azul de Medianoche
        cyan: {
          DEFAULT: "#00E5FF",   // Cian Eléctrico
          muted: "#00B8CC",
          dim: "#007A8A",
        },
        frost: "#FFFFFF",       // Blanco Puro
        // Extended shades
        "base-light": "#0F1829",
        "midnight-light": "#243050",
        "slate-frost": "#8BA0B4",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        tight: ["Inter Tight", "Inter", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scan": "scan 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 10px #00E5FF, 0 0 20px #00E5FF" },
          "100%": { textShadow: "0 0 20px #00E5FF, 0 0 40px #00E5FF, 0 0 60px #00E5FF" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(to bottom, rgba(10,15,31,0.7) 0%, rgba(10,15,31,0.4) 50%, rgba(10,15,31,0.95) 100%)",
        "cyan-glow": "radial-gradient(circle at center, rgba(0,229,255,0.15) 0%, transparent 70%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "cyan-glow": "0 0 30px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)",
        "cyan-sm": "0 0 15px rgba(0,229,255,0.2)",
        "card": "0 8px 32px rgba(0,0,0,0.4)",
        "card-hover": "0 20px 60px rgba(0,229,255,0.15), 0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
