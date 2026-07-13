import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F5F1",
        surface: "#FFFFFF",
        ink: "#101612",
        forest: "#0A1410",
        stone: "#DDE2DC",
        brand: { DEFAULT: "#16A466", deep: "#087A49", soft: "#7BE2B0", tint: "#E8F7EF" },
        compare: "#FF8A3D",
        reward: "#4285F4"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
