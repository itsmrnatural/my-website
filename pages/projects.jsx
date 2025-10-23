import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import swr from "../public/js/swr";
import Repositories from "@components/Repositories";
import Pagination from "@components/Pagination";

/**
 * Projects page component displaying GitHub repositories with pagination
 * @returns {JSX.Element} The Projects page
 */
export default function Projects() {
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [headerTransform, setHeaderTransform] = useState({ y: 0, opacity: 1 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const threshold = window.innerHeight * 0.25;
      
      if (scrollPos > threshold) {
        const translateY = -(scrollPos - threshold) * 0.3;
        const opacity = Math.max(0.2, 1 - (scrollPos - threshold) / 500);
        setHeaderTransform({ y: translateY, opacity });
      } else {
        setHeaderTransform({ y: 0, opacity: 1 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch repositories data
  const { data: _repositories, error, isValidating } = swr("/api/repos");
  const repositories = _repositories || [];

  const totalPages = Math.ceil(repositories.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  /**
   * Handles navigation to the previous page
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /**
   * Handles navigation to the next page
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Head>
        <title>Mr. Natural • Projects</title>
        <meta name="description" content="Explore my GitHub repositories and personal projects" />
        <meta property="og:title" content="Mr. Natural • Projects" />
        <meta
          property="og:description"
          content="Explore my GitHub repositories and personal projects"
        />
        <meta property="og:type" content="website" />
      </Head>

      <div ref={containerRef} className="py-8 md:py-12">
        <motion.div
          style={{ 
            transform: `translateY(${headerTransform.y}px)`,
            opacity: headerTransform.opacity
          }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-coffee-600 dark:text-gray-400 mb-8">
            Explore my open source repositories and personal projects
          </p>
        </motion.div>

        {/* Loading state */}
        {isValidating && repositories.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-600 dark:border-white"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-900/20 border border-red-900 rounded-lg p-4 my-4">
            <p className="text-red-400">Failed to load repositories. Please try again later.</p>
          </div>
        )}

        {/* Empty state */}
        {!isValidating && repositories.length === 0 && (
          <div className="bg-coffee-100 dark:bg-neutral-800/20 rounded-lg p-8 text-center my-8">
            <p className="text-xl text-coffee-900 dark:text-white">No projects found</p>
            <p className="text-coffee-700 dark:text-neutral-400 mt-2">
              Check back later for updates
            </p>
          </div>
        )}

        {/* Repository list */}
        {repositories.length > 0 && (
          <>
            <Repositories repositories={repositories} startIndex={startIndex} endIndex={endIndex} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
            />
          </>
        )}
      </div>
    </>
  );
}
