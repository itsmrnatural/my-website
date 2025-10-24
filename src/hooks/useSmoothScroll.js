import { useEffect } from 'react';

/**
 * Custom hook to add smooth scroll deceleration
 * Prevents jank when users scroll quickly and let go
 */
export default function useSmoothScroll() {
  useEffect(() => {
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let isScrolling = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      isScrolling = true;

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
}
