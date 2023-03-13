import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import swr from "../public/js/swr";

export default function Home() {
  const PAGE_SIZE = 5;
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
      <div className="py-20">
        <p className="text-3xl text-white font-semibold">My Projects</p>
        <p className="text-xl text-white/50 font-normal mb-5">
          This page is currently in works but you can see the outline of how
          projects would look like. :D
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 grid-center items-center mt-2">
          {repositories &&
            repositories
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
              .slice(startIndex, endIndex)
              .map((repo, index) => (
                <a
                  key={index}
                  href={`https://github.com/${repo.owner.login}/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#242424]/20 p-4 hover:bg-[#242424]/30 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                      <Image
                        src={repo.owner.avatar_url}
                        alt={`${repo.owner.login} avatar`}
                        width={24}
                        height={24}
                      />
                    </div>
                    <div>
                      <p className="text-md text-white">
                        {repo.owner.login}/
                        {repo.name
                          ? repo.name.length > 20
                            ? repo.name.slice(0, 20) + "..."
                            : repo.name
                          : "No name"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {repo.description
                          ? repo.description.length > 35
                            ? repo.description.slice(0, 35) + "..."
                            : repo.description
                          : "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end w-full h-full items-center">
                    <div className="flex w-full justify-end items-center">
                      <Tippy
                        content={`${repo.stargazers_count} stars`}
                        arrow={false}
                        animation="shift-away"
                      >
                        <div className="flex items-center mr-3">
                          <i className="fas fa-star text-yellow-500 mr-1 hover:sparkle" />
                          <p className="text-white">{repo.stargazers_count}</p>
                        </div>
                      </Tippy>
                      <Tippy
                        content={`${repo.forks} forks`}
                        arrow={false}
                        animation="shift-away"
                      >
                        <div className="flex items-center">
                          <i className="fas fa-code-branch text-white mr-1 glow" />
                          <p className="text-white">{repo.forks}</p>
                        </div>
                      </Tippy>
                    </div>
                  </div>
                </a>
              ))}
          {!repositories &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#191932]/20 p-4 rounded-lg w-full"
              >
                <div className="mt-5 flex w-full justify-between items-center">
                  <div className="bg-[#191932]/50 animate-pulse w-12 h-[24px] rounded-md" />
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-between items-center w-full mt-5">
          <button
            className="bg-[#242424]/20 hover:bg-[#242424]/40 text-white text-sm px-3 py-2 rounded-lg"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            ← Back
          </button>
          <p className="text-white">
            Page {currentPage}/{totalPages}
          </p>
          <button
            className="bg-[#242424]/20 hover:bg-[#242424]/40 text-white text-sm px-3 py-2 rounded-lg"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </>
  );
}
