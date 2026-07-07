import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Krahaso brand
        ink: "#141C17", // near-black text
        ground: "#F5F7F4", // warm off-white background
        dark: "#0E1512", // dark sections
        brand: {
          DEFAULT: "#159A63", // Krahaso green (accent only)
          deep: "#0E7A4C",
          soft: "#5FD79E",
          tint: "#E6F4EC",
        },
        line: "#E4E8E1",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
