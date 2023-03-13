import Image from "next/image";
import Tippy from "@tippyjs/react";

const Repositories = ({ repositories, startIndex, endIndex }) => {
  return (
    <>
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
            <div key={index} className="bg-[#191932]/20 p-4 rounded-lg w-full">
              <div className="mt-5 flex w-full justify-between items-center">
                <div className="bg-[#191932]/50 animate-pulse w-12 h-[24px] rounded-md" />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Repositories;
