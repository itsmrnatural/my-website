import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    } else {
        return num.toString();
    }
};

const Repositories = ({ repositories, startIndex, endIndex }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {repositories ? (
                repositories
                    .sort((a, b) => b.stargazers_count - a.stargazers_count)
                    .slice(startIndex, endIndex)
                    .map((repo, index) => (
                        <a
                            key={index}
                            href={`https://github.com/${repo.owner.login}/${repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 p-3 rounded-lg border border-white/10 "
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
                                        {`${repo.owner.login}/${repo.name}`
                                            ? `${repo.owner.login}/${repo.name}`
                                                  .length > 20
                                                ? `${repo.owner.login}/${repo.name}`.slice(
                                                      0,
                                                      20
                                                  ) + "..."
                                                : `${repo.owner.login}/${repo.name}`
                                            : "No name"}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {repo.description
                                            ? repo.description.length > 30
                                                ? repo.description.slice(
                                                      0,
                                                      30
                                                  ) + "..."
                                                : repo.description
                                            : "No description"}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between w-full">
                                <div className="flex items-center">
                                    <Tippy
                                        content={`${repo.stargazers_count} stars`}
                                    >
                                        <div className="flex items-center mr-3">
                                            <i className="fas fa-star text-yellow-500 mr-1" />
                                            <p className="text-gray-400">
                                                {formatNumber(
                                                    repo.stargazers_count
                                                )}
                                            </p>
                                        </div>
                                    </Tippy>
                                    <Tippy content={`${repo.forks} forks`}>
                                        <div className="flex items-center">
                                            <i className="fas fa-code-branch text-white mr-1" />
                                            <p className="text-gray-400">
                                                {formatNumber(repo.forks)}
                                            </p>
                                        </div>
                                    </Tippy>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-sm text-gray-400">
                                        Updated{" "}
                                        {new Date(
                                            repo.updated_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white/10 p-4 rounded-lg border border-gray-600"
                        >
                            <div className="flex items-center mb-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-white/10" />
                                <div>
                                    <div className="bg-white/10 w-24 h-4 rounded-md" />
                                    <div className="bg-white/10 w-20 h-3 mt-1 rounded-md" />
                                </div>
                            </div>
                            <div className="mt-5 flex justify-between w-full">
                                <div className="flex items-center">
                                    <div className="flex items-center mr-3">
                                        <div className="bg-white/10 w-8 h-4 rounded-md" />
                                    </div>
                                    <div className="flex items-center">
                                        <div className="bg-white/10 w-8 h-4 rounded-md" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-white/10 w-24 h-4 rounded-md" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Repositories;
