module.exports = {
  // Basic formatting
  printWidth: 100, // Line length where Prettier will try to wrap
  tabWidth: 2, // Industry standard is 2 spaces
  useTabs: false, // Use spaces instead of tabs
  semi: true, // Add semicolons at the end of statements

  // Quotes
  singleQuote: false, // I typically use double quotes
  jsxSingleQuote: false, // Use double quotes in JSX

  // Brackets and Commas
  bracketSpacing: true, // Spaces inside object literals
  bracketSameLine: false, // Put > on a new line in JSX
  arrowParens: "always", // Always include parentheses around arrow function parameters
  trailingComma: "es5", // Add trailing commas where valid in ES5

  // JSX specific
  jsxBracketSameLine: false, // JSX closing bracket goes on a new line

  // Specialized formatting
  proseWrap: "preserve", // Don't wrap markdown text
  htmlWhitespaceSensitivity: "css", // Respect CSS display property
  endOfLine: "lf", // Use LF line endings
};
