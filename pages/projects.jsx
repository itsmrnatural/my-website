import Head from "next/head";
import { useState } from "react";
import swr from "../public/js/swr";
import Repositories from "../components/Repositories";
import Pagination from "../components/Pagination";

export default function Projects() {
  const PAGE_SIZE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch repositories data
  const { data: _repositories, error, isValidating } = swr("/api/repos");
  const repositories = _repositories || [];

  const totalPages = Math.ceil(repositories.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

      <div className="py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">My Projects</h1>
        <p className="text-xl text-neutral-400 mb-8">
          Explore my open source repositories and personal projects
        </p>

        {/* Loading state */}
        {isValidating && repositories.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
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
          <div className="bg-neutral-800/20 rounded-lg p-8 text-center my-8">
            <p className="text-xl">No projects found</p>
            <p className="text-neutral-400 mt-2">Check back later for updates</p>
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
