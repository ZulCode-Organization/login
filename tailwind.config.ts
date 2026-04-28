import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "zul-dark": "#0a0b10",
        "zul-blue": "#2b6bf3",
        "zul-surface": "#14161f",
        "zul-border": "#222630",
        "zul-surface-2": "#161821",
      },
      boxShadow: {
        "neon-blue": "0 0 15px rgba(43, 107, 243, 0.4)",
        "neon-blue-lg": "0 0 30px rgba(43, 107, 243, 0.3)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
