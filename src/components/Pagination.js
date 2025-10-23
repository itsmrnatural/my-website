/**
 * Pagination component for navigating through pages
 * @param {Object} props - Component props
 * @param {number} props.currentPage - The current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.handlePreviousPage - Handler for previous page navigation
 * @param {Function} props.handleNextPage - Handler for next page navigation
 * @returns {JSX.Element} The pagination controls
 */
const Pagination = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
  return (
    <div className="flex justify-between items-center w-full mt-5">
      <button
        className="bg-coffee-200 dark:bg-white/5 hover:bg-coffee-300 dark:hover:bg-white/10 border border-coffee-300 dark:border-transparent hover:border-coffee-400 dark:hover:border-white text-coffee-900 dark:text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        ← Back
      </button>
      <p className="text-coffee-900 dark:text-white font-medium">
        Page {currentPage}/{totalPages}
      </p>
      <button
        className="bg-coffee-200 dark:bg-white/5 hover:bg-coffee-300 dark:hover:bg-white/10 border border-coffee-300 dark:border-transparent hover:border-coffee-400 dark:hover:border-white text-coffee-900 dark:text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
