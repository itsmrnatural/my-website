import { useTheme } from "@contexts/ThemeContext";

/**
 * Theme toggle button component
 * Shows coffee cup icon for light theme and moon icon for dark theme
 * @returns {JSX.Element} Theme toggle button
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg flex items-center justify-center opacity-0">
        <span className="text-xl">☕</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg bg-coffee-200 dark:bg-coffee-800 hover:bg-coffee-300 dark:hover:bg-coffee-700 flex items-center justify-center transition-colors duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <span className="text-2xl" role="img" aria-label="Coffee cup">
          ☕
        </span>
      ) : (
        <span className="text-2xl" role="img" aria-label="Moon">
          🌙
        </span>
      )}
    </button>
  );
}
