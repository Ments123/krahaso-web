import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#1f2a1d',
        moss: '#2d3a2a',
        bodygreen: '#4b5b47',
        headline: '#336443',
        sage: '#85AB8B',
      },
      fontFamily: {
        display: ['Neue Haas Grotesk Display Pro 55 Roman', 'Neue Haas Grotesk Text Pro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
