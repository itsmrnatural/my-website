import Head from "next/head";
import { useState } from "react";
import swr from "../public/js/swr";
import Repositories from "../components/Repositories";
import Pagination from "../components/Pagination";

export default function Home() {
    const PAGE_SIZE = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const { data: _repositories } = swr("/api/repos");
    const repositories = _repositories ? _repositories : null;

    const totalPages = Math.ceil(
        (repositories ? repositories.length : 0) / PAGE_SIZE
    );
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

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
            </Head>
            <div className="py-20 px-5">
                <p className="text-3xl text-white font-semibold">My Repos</p>
                <p className="text-xl text-white/50 font-normal mb-5">
                    These are my current repos. Soon, I will include other
                    projects sections here too.
                </p>
                <Repositories
                    repositories={repositories}
                    startIndex={startIndex}
                    endIndex={endIndex}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </>
    );
}
