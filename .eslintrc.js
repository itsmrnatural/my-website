module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    // Fix passHref warnings
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-no-target-blank": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
};
