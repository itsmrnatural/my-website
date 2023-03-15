const Pagination = ({
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
}) => {
    return (
        <div className="flex justify-between items-center w-full mt-5">
            <button
                className="bg-white/5 hover:bg-white/10 border border-transparent hover:border-white text-white text-sm px-3 py-2 rounded-lg"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                ← Back
            </button>
            <p className="text-white">
                Page {currentPage}/{totalPages}
            </p>
            <button
                className="bg-white/5 hover:bg-white/10 border border-transparent hover:border-white text-white text-sm px-3 py-2 rounded-lg"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;
