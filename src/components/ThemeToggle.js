import { useTheme } from "@contexts/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Theme toggle button component
 * Shows coffee cup icon for light theme and moon icon for dark theme
 * @returns {JSX.Element} Theme toggle button
 */
export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [showToast, setShowToast] = useState(false);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg flex items-center justify-center opacity-0">
        <span className="text-xl">☕</span>
      </button>
    );
  }

  const handleToggle = () => {
    const wasLight = theme === "light";
    toggleTheme();
    
    // Show toast when switching to dark mode
    if (wasLight) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
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

      {/* Cheers! Toast - positioned next to toggle */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 px-4 py-2 bg-gradient-to-r from-coffee-700 to-coffee-800 text-white rounded-xl shadow-2xl border border-coffee-600 whitespace-nowrap"
            style={{
              boxShadow: '0 10px 40px rgba(101, 67, 33, 0.4), 0 0 20px rgba(200, 150, 100, 0.3)'
            }}
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ 
                  rotate: [0, -15, 15, -10, 0],
                  y: [0, -2, 0, -1, 0]
                }}
                transition={{ duration: 0.6 }}
                className="text-xl"
              >
                ☕
              </motion.span>
              <span className="font-bold text-base tracking-wide">
                Cheers!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
