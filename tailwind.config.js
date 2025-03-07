// filepath: /workspaces/my-website/tailwind.config.js
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Karla", "ui-sans-serif", "system-ui"],
      heading: ["Poppins", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        ...colors,
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#FFFFFF",
            a: {
              color: "#8B5CF6",
              "&:hover": {
                color: "#7C3AED",
              },
            },
            h1: {
              color: "#FFFFFF",
            },
            h2: {
              color: "#FFFFFF",
            },
            h3: {
              color: "#FFFFFF",
            },
            strong: {
              color: "#FFFFFF",
            },
            code: {
              color: "#FFFFFF",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "0.25rem",
              padding: "0.25rem",
            },
            blockquote: {
              color: "#E2E8F0",
              borderLeftColor: "#7C3AED",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
