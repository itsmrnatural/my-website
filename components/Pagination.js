import React from 'react';

const Pagination = ({
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
}) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className="flex justify-between items-center w-full mt-5">
            <button
                className={`bg-white/5 hover:bg-white/10 border border-transparent hover:border-white text-white text-sm px-3 py-2 rounded-lg ${isFirstPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={handlePreviousPage}
                disabled={isFirstPage}
            >
                ← Back
            </button>
            <p className="text-white">
                Page {currentPage}/{totalPages}
            </p>
            <button
                className={`bg-white/5 hover:bg-white/10 border border-transparent hover:border-white text-white text-sm px-3 py-2 rounded-lg ${isLastPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={handleNextPage}
                disabled={isLastPage}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;
