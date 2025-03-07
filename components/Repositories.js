import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState, useEffect, useRef } from "react";

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

const languageColors = {
  javascript: "#f1e05a",
  typescript: "#3178c6",
  python: "#3572A5",
  java: "#b07219",
  html: "#e34c26",
  css: "#563d7c",
  php: "#4F5D95",
  ruby: "#701516",
  go: "#00ADD8",
  "c#": "#178600",
  "c++": "#f34b7d",
  c: "#555555",
  shell: "#89e051",
  vue: "#41b883",
  rust: "#dea584",
  dart: "#00B4AB",
  kotlin: "#F18E33",
  swift: "#ffac45",
  react: "#61dafb",
  angular: "#dd0031",
  svelte: "#ff3e00",
  lua: "#000080",
  perl: "#0298c3",
  elixir: "#6e4a7e",
  scala: "#c22d40",
  haskell: "#5e5086",
  r: "#198CE7",
  groovy: "#e69f56",
  powershell: "#012456",
  "objective-c": "#438eff",
  clojure: "#db5855",
  default: "#8b8b8b",
};

const sortOptions = [
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
  { value: "created", label: "Newest" },
];

const Repositories = ({ repositories, startIndex, endIndex }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowLanguageFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extract available languages from repositories
  useEffect(() => {
    if (repositories && repositories.length > 0) {
      const languages = repositories
        .map((repo) => repo.language)
        .filter((lang) => lang !== null && lang !== undefined);

      const uniqueLanguages = ["all", ...new Set(languages)].sort();
      setAvailableLanguages(uniqueLanguages);
    }
  }, [repositories]);

  // Filter and sort repositories
  const filteredSortedRepos = repositories
    ? [...repositories]
        .filter((repo) => {
          if (filterLanguage === "all") return true;
          return repo.language?.toLowerCase() === filterLanguage.toLowerCase();
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "stars":
              return b.stargazers_count - a.stargazers_count;
            case "forks":
              return b.forks - a.forks;
            case "updated":
              return new Date(b.updated_at) - new Date(a.updated_at);
            case "created":
              return new Date(b.created_at) - new Date(a.created_at);
            default:
              return b.stargazers_count - a.stargazers_count;
          }
        })
    : [];

  // Get current sort option label
  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Most Stars";

  return (
    <>
      {/* Control Panel - Sort and Filter */}
      {repositories && repositories.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0 sm:space-x-2">
          {/* Language Filter Button */}
          <div className="flex flex-col w-full sm:w-auto relative" ref={filterRef}>
            <button
              onClick={() => setShowLanguageFilter(!showLanguageFilter)}
              className="flex items-center text-sm bg-neutral-800/30 hover:bg-neutral-800/50 text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <i className={`fas fa-filter mr-2 text-neutral-400`} />
              {filterLanguage === "all" ? "Filter by Language" : `Language: ${filterLanguage}`}
              <i
                className={`fas fa-chevron-${
                  showLanguageFilter ? "up" : "down"
                } ml-2 text-neutral-400`}
              />
            </button>

            {/* Expandable Language Filter */}
            {showLanguageFilter && (
              <div className="absolute top-full left-0 z-10 mt-2 p-3 rounded-lg bg-neutral-800/90 border border-neutral-700/50 w-72 max-h-64 overflow-y-auto backdrop-blur shadow-lg">
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setFilterLanguage(language);
                        setShowLanguageFilter(false);
                      }}
                      className={`flex items-center px-2 py-1 rounded-md text-xs ${
                        filterLanguage === language
                          ? "bg-neutral-700/80 text-white"
                          : "bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-200"
                      }`}
                    >
                      {language !== "all" && (
                        <span
                          className="h-3 w-3 rounded-full mr-1.5"
                          style={{
                            backgroundColor:
                              languageColors[language.toLowerCase()] || languageColors.default,
                          }}
                        />
                      )}
                      {language === "all" ? "All Languages" : language}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Custom Sort Dropdown (matching filter style) */}
          <div className="flex flex-col w-full sm:w-auto relative" ref={sortRef}>
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center text-sm bg-neutral-800/30 hover:bg-neutral-800/50 text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <i className={`fas fa-sort mr-2 text-neutral-400`} />
              {`Sort: ${currentSortLabel}`}
              <i
                className={`fas fa-chevron-${
                  showSortOptions ? "up" : "down"
                } ml-2 text-neutral-400`}
              />
            </button>

            {/* Sort Options Dropdown */}
            {showSortOptions && (
              <div className="absolute top-full right-0 z-10 mt-2 p-2 rounded-lg bg-neutral-800/90 border border-neutral-700/50 w-56 overflow-hidden backdrop-blur shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortOptions(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm ${
                      sortBy === option.value
                        ? "bg-neutral-700/80 text-white"
                        : "text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-200"
                    }`}
                  >
                    <i
                      className={`fas fa-${
                        option.value === "stars"
                          ? "star"
                          : option.value === "forks"
                          ? "code-branch"
                          : option.value === "updated"
                          ? "clock"
                          : "calendar-plus"
                      } mr-2 ${sortBy === option.value ? "text-white" : "text-neutral-400"}`}
                    />
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Repository Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {repositories ? (
          filteredSortedRepos.length > 0 ? (
            filteredSortedRepos.slice(startIndex, endIndex).map((repo, index) => {
              // Get language color or use default
              const langLower = repo.language ? repo.language.toLowerCase() : "default";
              const langColor = languageColors[langLower] || languageColors.default;

              return (
                <a
                  key={index}
                  href={`https://github.com/${repo.owner.login}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/8 transition-all duration-200 flex flex-col h-[160px]"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-1.5 w-full">
                    <div className="flex items-center flex-1 min-w-0 mr-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <Image
                          src={repo.owner.avatar_url}
                          alt={`${repo.owner.login} avatar`}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-md font-medium text-white truncate">
                          {`${repo.owner.login}/${repo.name}`}
                        </p>
                      </div>
                    </div>

                    {/* Language indicator */}
                    {repo.language && (
                      <div className="flex-shrink-0">
                        <Tippy content={`Written in ${repo.language}`}>
                          <div className="flex items-center">
                            <span
                              className="h-4 w-4 rounded-full mr-1"
                              style={{ backgroundColor: langColor }}
                            />
                            <span className="text-xs text-gray-300 font-medium hidden sm:inline">
                              {repo.language}
                            </span>
                          </div>
                        </Tippy>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {repo.description || "No description provided"}
                    </p>
                  </div>

                  {/* Stats row */}
                  <div className="mt-auto pt-1.5 flex justify-between w-full items-center">
                    <div className="flex items-center flex-wrap">
                      <Tippy content={`${repo.stargazers_count} stars`}>
                        <div className="flex items-center mr-3 mb-1">
                          <i className="fas fa-star text-yellow-400 mr-1" />
                          <p className="text-gray-400">{formatNumber(repo.stargazers_count)}</p>
                        </div>
                      </Tippy>
                      <Tippy content={`${repo.forks} forks`}>
                        <div className="flex items-center mr-3 mb-1">
                          <i className="fas fa-code-branch text-white/70 mr-1" />
                          <p className="text-gray-400">{formatNumber(repo.forks)}</p>
                        </div>
                      </Tippy>

                      {repo.watchers_count > 0 && repo.watchers_count !== repo.stargazers_count && (
                        <Tippy content={`${repo.watchers_count} watchers`}>
                          <div className="flex items-center mb-1">
                            <i className="fas fa-eye text-white/70 mr-1" />
                            <p className="text-gray-400">{formatNumber(repo.watchers_count)}</p>
                          </div>
                        </Tippy>
                      )}
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs text-gray-400">
                        {new Date(repo.updated_at).toLocaleDateString("en-GB", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            // No repositories match filter
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-10 px-4 bg-neutral-800/20 rounded-lg border border-neutral-700/30">
              <i className="fas fa-filter text-4xl text-neutral-500 mb-3" />
              <h3 className="text-lg font-medium text-neutral-300 mb-1">
                No matching repositories
              </h3>
              <p className="text-sm text-neutral-400 text-center">
                No repositories found with the language "{filterLanguage}".
              </p>
              <button
                onClick={() => setFilterLanguage("all")}
                className="mt-3 px-4 py-2 bg-neutral-700/50 hover:bg-neutral-700 rounded-md text-sm transition-colors"
              >
                Clear Filter
              </button>
            </div>
          )
        ) : (
          // Skeleton loading
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-lg border border-gray-600 animate-pulse h-[160px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-white/10" />
                  <div className="bg-white/10 w-32 h-4 rounded-md" />
                </div>
                <div className="flex items-center">
                  <div className="bg-white/10 h-4 w-4 rounded-full mr-1" />
                  <div className="bg-white/10 w-16 h-3 rounded-md hidden sm:block" />
                </div>
              </div>
              <div className="bg-white/10 w-full h-16 rounded-md mb-auto" />
              <div className="mt-auto pt-2 flex justify-between w-full">
                <div className="flex items-center">
                  <div className="flex items-center mr-3">
                    <div className="bg-white/10 w-8 h-4 rounded-md" />
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white/10 w-8 h-4 rounded-md" />
                  </div>
                </div>
                <div>
                  <div className="bg-white/10 w-16 h-4 rounded-md" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Repositories;
