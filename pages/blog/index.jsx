import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllPosts, getAllTags } from "../../lib/mdx";

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

  // Filter posts based on search query and selected tag
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  return (
    <>
      <Head>
        <title>Mr. Natural • Blog</title>
      </Head>
      <div className="py-20 px-5">
        <h1 className="text-4xl font-heading font-bold text-coffee-900 dark:text-white text-left mb-3">
          Blog
        </h1>
        <p className="text-xl font-subheading text-coffee-700 dark:text-white/50 font-normal text-left mb-8">
          Here are some of the blog posts I have written.
        </p>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-coffee-100 dark:bg-white/5 text-coffee-900 dark:text-white border-2 border-coffee-300 dark:border-white/10 focus:border-coffee-500 dark:focus:border-white/30 outline-none transition-colors"
          />

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

        {/* Blog Posts Timeline */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-coffee-600 dark:text-white/50 py-12">
              No posts found matching your criteria.
            </p>
          ) : (
            filteredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <a className="block group">
                  <article className="bg-coffee-100 dark:bg-white/5 hover:bg-coffee-200 dark:hover:bg-white/10 rounded-lg overflow-hidden transition-all duration-200 border border-coffee-300 dark:border-white/10">
                    <div className="md:flex">
                      {/* Image */}
                      <div className="md:w-1/3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 md:w-2/3">
                        <div className="flex items-center gap-3 mb-3 text-sm text-coffee-600 dark:text-white/60">
                          <time>{new Date(post.date).toLocaleDateString()}</time>
                          <span>•</span>
                          <span>{post.readingTime}</span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>

                        <h2 className="text-2xl font-heading font-bold text-coffee-900 dark:text-white mb-3 group-hover:text-coffee-700 dark:group-hover:text-white/80 transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-coffee-700 dark:text-white/70 mb-4 line-clamp-2">
                          {post.preview}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-medium bg-coffee-200 dark:bg-white/10 text-coffee-800 dark:text-white/80 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </a>
              </Link>
            ))
          )}
        </div>
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
