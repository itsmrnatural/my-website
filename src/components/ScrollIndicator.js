import { motion, useScroll } from "framer-motion";

/**
 * Scroll progress indicator component
 * Shows a progress bar at the top of the page as user scrolls
 * @returns {JSX.Element} The scroll progress indicator
 */
export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-coffee-500 via-coffee-600 to-coffee-700 dark:from-coffee-400 dark:via-coffee-500 dark:to-coffee-600 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
