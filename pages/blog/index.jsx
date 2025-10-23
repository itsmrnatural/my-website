import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
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
      <div className="py-20 px-5">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white text-left mb-4">
          Blog
        </h1>
        <p className="text-lg text-coffee-600 dark:text-gray-400 font-normal text-left mb-8">
          Here are some of the blog posts I have written.
        </p>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-coffee-100 dark:bg-white/5 text-coffee-900 dark:text-white border-2 border-coffee-300 dark:border-white/10 focus:border-coffee-500 dark:focus:border-white/30 outline-none transition-colors"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-lg bg-coffee-100 dark:bg-white/5 text-coffee-900 dark:text-white border-2 border-coffee-300 dark:border-white/10 focus:border-coffee-500 dark:focus:border-white/30 outline-none transition-colors"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTag === null
                    ? "bg-coffee-500 text-white"
                    : "bg-coffee-200 dark:bg-white/10 text-coffee-800 dark:text-white/70 hover:bg-coffee-300 dark:hover:bg-white/20"
                }`}
              >
                All Posts ({posts.length})
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(tag.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTag === tag.name
                      ? "bg-coffee-500 text-white"
                      : "bg-coffee-200 dark:bg-white/10 text-coffee-800 dark:text-white/70 hover:bg-coffee-300 dark:hover:bg-white/20"
                  }`}
                >
                  {tag.name} ({tag.count})
                </button>
              ))}
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
            {filteredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <BlogCard blog={post} />
              </Link>
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
