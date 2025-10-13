import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BlogCard from "@components/BlogCard";
import { getAllBlogs, getAllTags } from "@lib/blog";
import { motion } from "framer-motion";

/**
 * Blog listing page component displaying all blog posts
 * @returns {JSX.Element} The Blog listing page
 */
export default function Blog({ blogs, tags }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        searchQuery === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.preview.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "" || blog.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <>
      <Head>
        <title>Mr. Natural • Blog</title>
        <meta name="description" content="Thoughts on code, coffee, and everything in between." />
      </Head>
      <div className="py-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-3xl text-white font-semibold text-left">Blog</p>
          <p className="text-xl text-white/50 font-normal text-left mb-5">
            Thoughts on code, coffee, and everything in between.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 transition-all"
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  selectedTag === ""
                    ? "bg-fuchsia-500 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? "bg-fuchsia-500 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-sm text-gray-400"
        >
          Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "post" : "posts"}
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6"
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Link href={`/blog/${blog.slug}`}>
                <a href={`/blog/${blog.slug}`}>
                  <BlogCard blog={blog} />
                </a>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredBlogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center py-20"
          >
            <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
            <p className="text-gray-400 text-lg">No posts found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("");
              }}
              className="mt-4 px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}

/**
 * Get static props for blog page
 * Fetches all blog posts and tags at build time
 */
export async function getStaticProps() {
  const blogs = getAllBlogs();
  const tags = getAllTags();

  return {
    props: {
      blogs,
      tags,
    },
  };
}
