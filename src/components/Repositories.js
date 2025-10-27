import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useState, useEffect, useRef } from "react";

/**
 * Formats a number to a human-readable string with K/M suffixes
 * @param {number} num - The number to format
 * @returns {string} The formatted number string
 */
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

/**
 * Programming language color mappings for repository badges
 */
const languageColors = {
  javascript: "#f1e05a",
  typescript: "#3178c6",
  python: "#3572A5",
  java: "#b07219",
  html: "#e34c26",
  css: "#663399",
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

/**
 * Sort options for repository listings
 */
const sortOptions = [
  { value: "stars", label: "Most Stars" },
  { value: "forks", label: "Most Forks" },
  { value: "updated", label: "Recently Updated" },
  { value: "created", label: "Newest" },
];

/**
 * Repositories component for displaying GitHub repositories with filtering and sorting
 * @param {Object} props - Component props
 * @param {Array} props.repositories - List of repository objects
 * @param {number} props.startIndex - Starting index for pagination
 * @param {number} props.endIndex - Ending index for pagination
 * @param {boolean} props.isFeatured - Whether this is a featured repository section
 * @returns {JSX.Element} The repositories grid with controls
 */
const Repositories = ({ repositories, startIndex, endIndex, isFeatured = false, onFilterChange }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const didMountRef = useRef(false);

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
        .filter((repo) => {
          const query = searchQuery.trim().toLowerCase();
          if (!query) return true;

          const nameMatch = repo.name?.toLowerCase().includes(query);
          const descriptionMatch = repo.description?.toLowerCase().includes(query);
          const topicsMatch = Array.isArray(repo.topics)
            ? repo.topics.join(" ").toLowerCase().includes(query)
            : false;

          return nameMatch || descriptionMatch || topicsMatch;
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

  const filteredLength = filteredSortedRepos.length;

  // Surface filtered length and reset hints to parent for pagination syncing
  useEffect(() => {
    if (isFeatured || typeof onFilterChange !== "function") return;

    onFilterChange({
      count: filteredLength,
      resetPage: didMountRef.current,
    });

    if (!didMountRef.current) {
      didMountRef.current = true;
    }
  }, [filteredLength, sortBy, filterLanguage, searchQuery, isFeatured, onFilterChange]);

  // Get current sort option label
  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Most Stars";

  return (
    <>
      {/* Control Panel - Sort and Filter (hidden for featured sections) */}
      {!isFeatured && repositories && repositories.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-2">
          {/* Search Input */}
          <div className="flex w-full sm:flex-1" style={{ maxWidth: "32rem" }}>
            <div className="flex w-full items-center bg-white dark:bg-neutral-800 text-coffee-900 dark:text-white border-2 border-coffee-300 dark:border-neutral-700 rounded-lg px-3 py-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-coffee-400/60 dark:focus-within:ring-white/40">
              <i className="fas fa-search mr-2 text-coffee-700 dark:text-neutral-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search repositories..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-coffee-400 dark:placeholder:text-neutral-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-xs font-semibold text-coffee-700 dark:text-neutral-300 hover:text-coffee-900 dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Language Filter Button */}
          <div className="flex flex-col w-full sm:w-auto relative" ref={filterRef}>
            <button
              onClick={() => setShowLanguageFilter(!showLanguageFilter)}
              className="flex items-center text-sm bg-coffee-200 dark:bg-neutral-800/30 hover:bg-coffee-300 dark:hover:bg-neutral-800/50 text-coffee-900 dark:text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200 border border-coffee-300 dark:border-transparent"
            >
              <i className={`fas fa-filter mr-2 text-coffee-700 dark:text-neutral-400`} />
              {filterLanguage === "all" ? "Filter by Language" : `Language: ${filterLanguage}`}
              <i
                className={`fas fa-chevron-${
                  showLanguageFilter ? "up" : "down"
                } ml-2 text-coffee-700 dark:text-neutral-400`}
              />
            </button>

            {/* Expandable Language Filter */}
            {showLanguageFilter && (
              <div className="absolute top-full left-0 z-10 mt-2 p-3 rounded-lg bg-white dark:bg-neutral-800/90 border border-coffee-300 dark:border-neutral-700/50 w-72 max-h-64 overflow-y-auto backdrop-blur shadow-lg">
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
                          ? "bg-coffee-300 dark:bg-neutral-700/80 text-coffee-900 dark:text-white"
                          : "bg-coffee-100 dark:bg-neutral-800/50 text-coffee-700 dark:text-neutral-400 hover:bg-coffee-200 dark:hover:bg-neutral-700/50 hover:text-coffee-900 dark:hover:text-neutral-200"
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
              className="flex items-center text-sm bg-coffee-200 dark:bg-neutral-800/30 hover:bg-coffee-300 dark:hover:bg-neutral-800/50 text-coffee-900 dark:text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200 border border-coffee-300 dark:border-transparent"
            >
              <i className={`fas fa-sort mr-2 text-coffee-700 dark:text-neutral-400`} />
              {`Sort: ${currentSortLabel}`}
              <i
                className={`fas fa-chevron-${
                  showSortOptions ? "up" : "down"
                } ml-2 text-coffee-700 dark:text-neutral-400`}
              />
            </button>

            {/* Sort Options Dropdown */}
            {showSortOptions && (
              <div className="absolute top-full right-0 z-10 mt-2 p-2 rounded-lg bg-white dark:bg-neutral-800/90 border border-coffee-300 dark:border-neutral-700/50 w-56 overflow-hidden backdrop-blur shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortOptions(false);
                    }}
                    className={`flex items-center px-3 py-2 w-full text-left rounded-md text-sm ${
                      sortBy === option.value
                        ? "bg-coffee-300 dark:bg-neutral-700/80 text-coffee-900 dark:text-white"
                        : "text-coffee-700 dark:text-neutral-300 hover:bg-coffee-200 dark:hover:bg-neutral-700/50 hover:text-coffee-900 dark:hover:text-neutral-200"
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
                      } mr-2 ${
                        sortBy === option.value
                          ? "text-coffee-800 dark:text-white"
                          : "text-coffee-600 dark:text-neutral-400"
                      }`}
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
      <div className={`grid gap-5 w-full ${
        isFeatured 
          ? "grid-cols-1 md:grid-cols-2" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      }`}>
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
                  className={`group relative flex flex-col bg-white dark:bg-neutral-900/50 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] overflow-hidden shadow-lg hover:shadow-2xl ${
                    isFeatured
                      ? "border-yellow-400/70 dark:border-yellow-500/50 hover:border-yellow-500 dark:hover:border-yellow-400 hover:shadow-yellow-400/20 dark:hover:shadow-yellow-500/10"
                      : "border-coffee-300/60 dark:border-neutral-700/60 hover:border-coffee-500 dark:hover:border-neutral-600 hover:shadow-coffee-400/20 dark:hover:shadow-neutral-800/50"
                  }`}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none ${
                    isFeatured
                      ? "bg-gradient-to-br from-yellow-100 via-yellow-50 to-transparent dark:from-yellow-500/10 dark:via-yellow-500/5 dark:to-transparent"
                      : "bg-gradient-to-br from-coffee-100 via-coffee-50 to-transparent dark:from-neutral-800/30 dark:via-neutral-800/10 dark:to-transparent"
                  }`} />

                  {/* Card content */}
                  <div className="relative flex flex-col h-full p-4">
                    {/* Header section */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex-1 min-w-0">
                        {/* Repository name */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-coffee-900 dark:text-white group-hover:text-coffee-700 dark:group-hover:text-coffee-300 transition-colors truncate">
                            {repo.name}
                          </h3>
                          {repo.isContributor && (
                            <Tippy content="Contributor">
                              <span className="flex-shrink-0 text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded-full font-bold border border-blue-300 dark:border-blue-500/30">
                                CONTRIB
                              </span>
                            </Tippy>
                          )}
                        </div>
                        {/* Owner */}
                        <p className="text-xs text-coffee-600 dark:text-neutral-400 font-medium truncate">
                          {repo.owner.login}
                        </p>
                      </div>

                      {/* Badges container */}
                      <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
                        {/* Featured badge */}
                        {isFeatured && (
                          <Tippy content="Featured Project">
                            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 px-2 py-0.5 rounded-full shadow-md">
                              <i className="fas fa-star text-yellow-900 dark:text-yellow-50 text-[10px]" />
                              <span className="text-[10px] font-bold text-yellow-900 dark:text-yellow-50 uppercase tracking-wide">
                                Featured
                              </span>
                            </div>
                          </Tippy>
                        )}

                        {/* Language badge */}
                        {repo.language && (
                          <Tippy content={`Written in ${repo.language}`}>
                            <div className="flex items-center gap-1.5 bg-coffee-200/70 dark:bg-neutral-800/70 px-2 py-1 rounded-lg border border-coffee-300/50 dark:border-neutral-700/50 backdrop-blur-sm">
                              <span
                                className="h-2 w-2 rounded-full ring-2 ring-white/50 dark:ring-black/30"
                                style={{ backgroundColor: langColor }}
                              />
                              <span className="text-[11px] text-coffee-900 dark:text-neutral-200 font-semibold uppercase tracking-wide">
                                {repo.language}
                              </span>
                            </div>
                          </Tippy>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-grow mb-3">
                      <p className="text-sm text-coffee-700 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {repo.description || "No description provided"}
                      </p>
                    </div>

                    {/* Stats footer */}
                    <div className="flex items-center justify-between gap-3 pt-2.5 border-t-2 border-coffee-200/60 dark:border-neutral-800/60">
                      {/* Left side - Stars and Forks */}
                      <div className="flex items-center gap-2">
                        <Tippy content={`${repo.stargazers_count} stars`}>
                          <div className="flex items-center gap-1.5 bg-yellow-100/80 dark:bg-yellow-500/15 px-2 py-1 rounded-md hover:bg-yellow-200/90 dark:hover:bg-yellow-500/25 transition-colors">
                            <i className="fas fa-star text-yellow-600 dark:text-yellow-400 text-xs" />
                            <span className="text-xs font-bold text-coffee-900 dark:text-neutral-200">
                              {formatNumber(repo.stargazers_count)}
                            </span>
                          </div>
                        </Tippy>

                        <Tippy content={`${repo.forks} forks`}>
                          <div className="flex items-center gap-1.5 bg-coffee-200/80 dark:bg-neutral-800/80 px-2 py-1 rounded-md hover:bg-coffee-300/90 dark:hover:bg-neutral-700/90 transition-colors">
                            <i className="fas fa-code-branch text-coffee-800 dark:text-neutral-300 text-xs" />
                            <span className="text-xs font-bold text-coffee-900 dark:text-neutral-200">
                              {formatNumber(repo.forks)}
                            </span>
                          </div>
                        </Tippy>

                        {/* License badge (featured only) */}
                        {isFeatured && repo.license && (
                          <Tippy content={`Licensed under ${repo.license.name}`}>
                            <div className="flex items-center gap-1.5 bg-green-100/80 dark:bg-green-500/15 px-2 py-1 rounded-md hover:bg-green-200/90 dark:hover:bg-green-500/25 transition-colors">
                              <i className="fas fa-certificate text-green-700 dark:text-green-400 text-xs" />
                              <span className="text-xs font-bold text-coffee-900 dark:text-neutral-200">
                                {repo.license.spdx_id || repo.license.key.toUpperCase()}
                              </span>
                            </div>
                          </Tippy>
                        )}
                      </div>

                      {/* Right side - Updated date */}
                      <Tippy content={`Last updated: ${new Date(repo.updated_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}`}>
                        <div className="flex items-center gap-1 text-xs text-coffee-600 dark:text-neutral-400 font-medium">
                          <i className="far fa-clock text-[10px]" />
                          <span className="whitespace-nowrap">
                            {new Date(repo.updated_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "2-digit"
                            })}
                          </span>
                        </div>
                      </Tippy>
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            // No repositories match filter
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-6 bg-coffee-100/40 dark:bg-neutral-800/30 rounded-xl border-2 border-coffee-300/50 dark:border-neutral-700/50">
              <i className="fas fa-filter text-5xl text-coffee-400 dark:text-neutral-500 mb-4" />
              <h3 className="text-xl font-bold text-coffee-900 dark:text-neutral-200 mb-2">
                No matching repositories
              </h3>
              <p className="text-sm text-coffee-700 dark:text-neutral-400 text-center mb-4">
                No repositories found with the language "{filterLanguage}".
              </p>
              {(filterLanguage !== "all" || searchQuery) && (
                <div className="flex flex-wrap justify-center gap-2">
                  {filterLanguage !== "all" && (
                    <button
                      onClick={() => setFilterLanguage("all")}
                      className="px-4 py-2 bg-coffee-500 hover:bg-coffee-600 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-white rounded-lg text-xs font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                      Clear Language
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-2 bg-coffee-200 hover:bg-coffee-300 dark:bg-neutral-800/70 dark:hover:bg-neutral-700/70 text-coffee-900 dark:text-neutral-200 rounded-lg text-xs font-medium transition-colors"
                    >
                      Reset Search
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        ) : (
          // Skeleton loading
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-900/50 p-4 rounded-xl border-2 border-coffee-300/40 dark:border-neutral-700/40 animate-pulse flex flex-col"
            >
              {/* Header skeleton */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex-1">
                  <div className="bg-coffee-200 dark:bg-neutral-800 h-5 w-3/4 rounded-md mb-1" />
                  <div className="bg-coffee-100 dark:bg-neutral-800/60 h-3 w-1/2 rounded-md" />
                </div>
                <div className="bg-coffee-200 dark:bg-neutral-800 h-7 w-20 rounded-lg" />
              </div>

              {/* Description skeleton */}
              <div className="flex-grow mb-3">
                <div className="bg-coffee-100 dark:bg-neutral-800/60 h-4 w-full rounded-md mb-1.5" />
                <div className="bg-coffee-100 dark:bg-neutral-800/60 h-4 w-4/5 rounded-md" />
              </div>

              {/* Footer skeleton */}
              <div className="flex items-center justify-between pt-2.5 border-t-2 border-coffee-200/40 dark:border-neutral-800/40">
                <div className="flex items-center gap-2">
                  <div className="bg-coffee-200 dark:bg-neutral-800 h-6 w-12 rounded-md" />
                  <div className="bg-coffee-200 dark:bg-neutral-800 h-6 w-12 rounded-md" />
                </div>
                <div className="bg-coffee-100 dark:bg-neutral-800/60 h-4 w-20 rounded-md" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Repositories;
