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
        coy: {
          pink: "#E01E69",
          "pink-hover": "#C2185B",
          dark: "#15121D",
          peach: "#FFE1CF",
          lavender: "#E7E0FF",
          yellow: "#FCD34D",
          green: "#15803D",
          mint: "#DCFCE7",
          "mint-text": "#15803D",
          muted: "#6D6979",
          "gray-border": "#ECE9F2",
          dashed: "#E5CBBA",
        },
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", "system-ui", "-apple-system", "sans-serif"],
        display: ["Bricolage Grotesque", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        "neo-btn": "3px 3px 0px #15121D",
        "neo-card": "3px 3px 0px #15121D",
        "neo-frame": "4px 4px 0px #15121D",
        "neo-sm": "2px 2px 0px #15121D",
        pill: "3px 3px 0px #15121D",
        card: "3px 3px 0px #15121D",
      },
    },
  },
  plugins: [],
};
export default config;
