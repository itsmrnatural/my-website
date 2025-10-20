// filepath: /workspaces/my-website/tailwind.config.js
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      philosopher: ["Philosopher", "serif"],
      lora: ["Lora", "serif"],
      sans: ["Karla", "ui-sans-serif", "system-ui"],
      heading: ["Philosopher", "serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        ...colors,
        primary: {
          cyan: "#08D9D6",
          dark: "#252A34",
          pink: "#FF2E63",
          light: "#EAEAEA",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#EAEAEA",
            a: {
              color: "#08D9D6",
              "&:hover": {
                color: "#FF2E63",
              },
            },
            h1: {
              color: "#EAEAEA",
              fontFamily: "Philosopher, serif",
            },
            h2: {
              color: "#EAEAEA",
              fontFamily: "Philosopher, serif",
            },
            h3: {
              color: "#EAEAEA",
              fontFamily: "Philosopher, serif",
            },
            strong: {
              color: "#EAEAEA",
            },
            code: {
              color: "#EAEAEA",
              backgroundColor: "rgba(8, 217, 214, 0.1)",
              borderRadius: "0.25rem",
              padding: "0.25rem",
              fontFamily: "JetBrains Mono, monospace",
            },
            blockquote: {
              color: "#EAEAEA",
              borderLeftColor: "#08D9D6",
            },
            p: {
              fontFamily: "Lora, serif",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
