import Head from "next/head";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const [filteredCount, setFilteredCount] = useState(0);
  const [headerTransform, setHeaderTransform] = useState({ y: 0, opacity: 1 });
  const containerRef = useRef(null);

  // Define featured repository names (customize these to your repos)
  const featuredRepoNames = ["my-website", "c-problems"];

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

  // Separate featured and regular repositories
  const featuredRepos = repositories.filter((repo) => featuredRepoNames.includes(repo.name));
  const regularRepos = repositories.filter((repo) => !featuredRepoNames.includes(repo.name));
  const regularRepoCount = regularRepos.length;

  useEffect(() => {
    setFilteredCount(regularRepoCount);
  }, [regularRepoCount]);

  const handleRepositoryFiltering = useCallback(({ count, resetPage }) => {
    setFilteredCount(count);
    if (resetPage) {
      setCurrentPage(1);
    }
  }, []);

  const totalPages = Math.max(1, Math.ceil((filteredCount || 0) / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
            opacity: headerTransform.opacity,
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
            {/* Featured Section */}
            {featuredRepos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-star text-yellow-500 dark:text-yellow-400 text-xl" />
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 dark:text-white">
                      Featured Projects
                    </h2>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-coffee-300 via-coffee-200 to-transparent dark:from-white/20 dark:via-white/10 dark:to-transparent" />
                </div>
                <Repositories
                  repositories={featuredRepos}
                  startIndex={0}
                  endIndex={featuredRepos.length}
                  isFeatured={true}
                />
              </motion.div>
            )}

            {/* Regular Repositories Section */}
            {regularRepos.length > 0 && (
              <>
                {featuredRepos.length > 0 && (
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-coffee-900 dark:text-white">
                      All Projects
                    </h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-coffee-300 via-coffee-200 to-transparent dark:from-white/20 dark:via-white/10 dark:to-transparent" />
                  </div>
                )}
                <Repositories
                  repositories={regularRepos}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  isFeatured={false}
                  onFilterChange={handleRepositoryFiltering}
                />
                {filteredCount > PAGE_SIZE && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
