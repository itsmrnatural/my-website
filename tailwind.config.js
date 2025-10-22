// filepath: /workspaces/my-website/tailwind.config.js
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Karla", "ui-sans-serif", "system-ui"],
      heading: ["Playfair Display", "ui-serif", "serif"],
      subheading: ["Lora", "ui-serif", "serif"],
      mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        ...colors,
        // Coffee palette for light theme
        coffee: {
          50: "#faf8f5", // lightest cream
          100: "#f5f0e8", // cream
          200: "#e8dcc8", // light tan
          300: "#d4c4a8", // tan
          400: "#b8a080", // medium brown
          500: "#8b6f47", // coffee brown
          600: "#6d5634", // dark coffee
          700: "#4a3a24", // espresso
          800: "#352a1a", // very dark
          900: "#1f1a12", // darkest
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.coffee.800"),
            a: {
              color: theme("colors.coffee.600"),
              "&:hover": {
                color: theme("colors.coffee.700"),
              },
            },
            h1: {
              color: theme("colors.coffee.900"),
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h2: {
              color: theme("colors.coffee.900"),
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h3: {
              color: theme("colors.coffee.800"),
              fontFamily: theme("fontFamily.subheading").join(", "),
            },
            h4: {
              color: theme("colors.coffee.800"),
              fontFamily: theme("fontFamily.subheading").join(", "),
            },
            strong: {
              color: theme("colors.coffee.900"),
            },
            code: {
              color: theme("colors.coffee.900"),
              backgroundColor: theme("colors.coffee.100"),
              borderRadius: "0.25rem",
              padding: "0.25rem 0.5rem",
              fontFamily: theme("fontFamily.mono").join(", "),
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: theme("colors.coffee.900"),
              code: {
                backgroundColor: "transparent",
                color: theme("colors.coffee.50"),
              },
            },
            blockquote: {
              color: theme("colors.coffee.700"),
              borderLeftColor: theme("colors.coffee.400"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.coffee.100"),
            a: {
              color: theme("colors.coffee.300"),
              "&:hover": {
                color: theme("colors.coffee.200"),
              },
            },
            h1: {
              color: theme("colors.coffee.50"),
            },
            h2: {
              color: theme("colors.coffee.50"),
            },
            h3: {
              color: theme("colors.coffee.100"),
            },
            h4: {
              color: theme("colors.coffee.100"),
            },
            strong: {
              color: theme("colors.coffee.50"),
            },
            code: {
              color: theme("colors.coffee.50"),
              backgroundColor: theme("colors.coffee.800"),
              fontWeight: "400",
            },
            pre: {
              backgroundColor: theme("colors.coffee.900"),
              code: {
                backgroundColor: "transparent",
                color: theme("colors.coffee.50"),
                fontWeight: "400",
              },
            },
            blockquote: {
              color: theme("colors.coffee.300"),
              borderLeftColor: theme("colors.coffee.600"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
