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
        background: "#0B0E14",
        surface: "#151921",
        emerald: {
          DEFAULT: "#10B981",
          glow: "rgba(16, 185, 129, 0.15)"
        },
        crimson: {
          DEFAULT: "#F87171",
          glow: "rgba(248, 113, 113, 0.15)"
        },
        text: {
          primary: "#F8FAFC",
          muted: "#94A3B8"
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)"
        }
      },
    },
  },
  plugins: [],
};
export default config;
