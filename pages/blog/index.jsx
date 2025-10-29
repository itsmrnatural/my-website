import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogCard from "@components/BlogCard";
import { getAllPosts, getAllTags } from "@lib/mdx";

/**
 * Blog listing page component displaying all blog posts
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of blog posts
 * @param {Array} props.tags - Array of available tags
 * @returns {JSX.Element} The Blog listing page
 */
export default function Blog({ posts, tags }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState("date-desc"); // date-desc, date-asc, title
  const [headerTransform, setHeaderTransform] = useState({ y: 0, opacity: 1 });
  const containerRef = useRef(null);
  const tagFilterRef = useRef(null);
  const sortRef = useRef(null);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const searchInputRef = useRef(null);

  const sortOptions = [
    { value: "date-desc", label: "Newest First", icon: "clock" },
    { value: "date-asc", label: "Oldest First", icon: "history" },
    { value: "title", label: "Title (A-Z)", icon: "font" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const threshold = window.innerHeight * 0.25;

      if (scrollPos > threshold) {
        const translateY = -(scrollPos - threshold) * 0.3;
        const opacity = Math.max(0.2, 1 - (scrollPos - threshold) / 500);
        setHeaderTransform({ y: translateY, opacity });
      } else {
        setHeaderTransform({ y: 0, opacity: 1 });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagFilterRef.current && !tagFilterRef.current.contains(event.target)) {
        setShowTagFilter(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Ctrl+/ or Cmd+/ to focus search input
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter posts based on search query and selected tag
  let filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  // Sort posts
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <>
      <Head>
        <title>Mr. Natural • Blog</title>
      </Head>
      <div ref={containerRef} className="py-20 px-5">
        <motion.div
          style={{
            transform: `translateY(${headerTransform.y}px)`,
            opacity: headerTransform.opacity,
          }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white text-left mb-4">
            Blog
          </h1>
          <p className="text-lg text-coffee-600 dark:text-gray-400 font-normal text-left mb-8">
            Here are some of the blog posts I have written.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            {/* Search */}
            <div className="flex w-full sm:flex-1" style={{ maxWidth: "32rem" }}>
              <div className="flex w-full items-center bg-white dark:bg-neutral-800 text-coffee-900 dark:text-white border-2 border-coffee-300 dark:border-neutral-700 rounded-lg px-3 py-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-coffee-400/60 dark:focus-within:ring-white/40">
                <i className="fas fa-search mr-2 text-coffee-700 dark:text-neutral-300" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-coffee-400 dark:placeholder:text-neutral-500"
                />
                <div className="flex items-center gap-2 ml-2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-xs font-semibold text-coffee-700 dark:text-neutral-300 hover:text-coffee-900 dark:hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-coffee-500 dark:text-neutral-500 border border-coffee-300 dark:border-neutral-700 rounded">
                    <span>Ctrl</span>
                    <span className="text-coffee-400 dark:text-neutral-600">+</span>
                    <span>/</span>
                  </kbd>
                </div>
              </div>
            </div>

            {/* Tag Filter */}
            {tags.length > 0 && (
              <div className="flex flex-col w-full sm:w-auto relative" ref={tagFilterRef}>
                <button
                  onClick={() => setShowTagFilter(!showTagFilter)}
                  className="flex items-center text-sm bg-coffee-200 dark:bg-neutral-800/30 hover:bg-coffee-300 dark:hover:bg-neutral-800/50 text-coffee-900 dark:text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200 border border-coffee-300 dark:border-transparent"
                >
                  <i className="fas fa-tags mr-2 text-coffee-700 dark:text-neutral-400" />
                  {selectedTag ? `Tag: ${selectedTag}` : "Filter by Tag"}
                  <i
                    className={`fas fa-chevron-${
                      showTagFilter ? "up" : "down"
                    } ml-2 text-coffee-700 dark:text-neutral-400`}
                  />
                </button>
                {showTagFilter && (
                  <div className="absolute top-full left-0 z-10 mt-2 p-3 rounded-lg bg-white dark:bg-neutral-800/90 border border-coffee-300 dark:border-neutral-700/50 w-72 max-h-64 overflow-y-auto backdrop-blur shadow-lg">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedTag(null);
                          setShowTagFilter(false);
                        }}
                        className={`flex items-center px-2 py-1 rounded-md text-xs ${
                          selectedTag === null
                            ? "bg-coffee-300 dark:bg-neutral-700/80 text-coffee-900 dark:text-white"
                            : "bg-coffee-100 dark:bg-neutral-800/50 text-coffee-700 dark:text-neutral-400 hover:bg-coffee-200 dark:hover:bg-neutral-700/50 hover:text-coffee-900 dark:hover:text-neutral-200"
                        }`}
                      >
                        All Tags ({posts.length})
                      </button>
                      {tags.map((tag) => (
                        <button
                          key={tag.name}
                          onClick={() => {
                            setSelectedTag(tag.name);
                            setShowTagFilter(false);
                          }}
                          className={`flex items-center px-2 py-1 rounded-md text-xs ${
                            selectedTag === tag.name
                              ? "bg-coffee-300 dark:bg-neutral-700/80 text-coffee-900 dark:text-white"
                              : "bg-coffee-100 dark:bg-neutral-800/50 text-coffee-700 dark:text-neutral-400 hover:bg-coffee-200 dark:hover:bg-neutral-700/50 hover:text-coffee-900 dark:hover:text-neutral-200"
                          }`}
                        >
                          <span className="font-semibold mr-1">{tag.name}</span>
                          <span className="text-[10px] text-coffee-600 dark:text-neutral-400">
                            {tag.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sort */}
            <div className="flex flex-col w-full sm:w-auto relative" ref={sortRef}>
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center text-sm bg-coffee-200 dark:bg-neutral-800/30 hover:bg-coffee-300 dark:hover:bg-neutral-800/50 text-coffee-900 dark:text-neutral-300 rounded-lg px-3 py-2 transition-all duration-200 border border-coffee-300 dark:border-transparent"
              >
                <i className="fas fa-sort mr-2 text-coffee-700 dark:text-neutral-400" />
                {`Sort: ${
                  sortOptions.find((option) => option.value === sortBy)?.label ?? "Newest First"
                }`}
                <i
                  className={`fas fa-chevron-${
                    showSortOptions ? "up" : "down"
                  } ml-2 text-coffee-700 dark:text-neutral-400`}
                />
              </button>
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
                        className={`fas fa-${option.icon} mr-2 ${
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

          {(selectedTag || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs text-coffee-700 dark:text-neutral-400">
              {searchQuery && (
                <span className="flex items-center bg-coffee-100 dark:bg-neutral-800/50 border border-coffee-200 dark:border-neutral-700 rounded-full px-3 py-1">
                  <i className="fas fa-search mr-1.5" />
                  <span className="mr-2">{searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-coffee-900 dark:hover:text-neutral-200"
                    aria-label="Clear search"
                  >
                    x
                  </button>
                </span>
              )}
              {selectedTag && (
                <span className="flex items-center bg-coffee-100 dark:bg-neutral-800/50 border border-coffee-200 dark:border-neutral-700 rounded-full px-3 py-1">
                  <i className="fas fa-tag mr-1.5" />
                  <span className="mr-2">{selectedTag}</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-coffee-900 dark:hover:text-neutral-200"
                    aria-label="Clear tag filter"
                  >
                    x
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-coffee-600 dark:text-white/50 py-12">
            No posts found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`} passHref>
                  <BlogCard blog={post} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Get static props for blog listing page
 * @returns {Object} Props containing posts and tags
 */
export async function getStaticProps() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return {
    props: {
      posts,
      tags,
    },
  };
}
