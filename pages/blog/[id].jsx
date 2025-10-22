import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllPosts, getPostBySlug } from "@lib/mdx";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Giscus from "@giscus/react";
import { useTheme } from "@contexts/ThemeContext";
import CodeBlock from "@components/CodeBlock";
import { useEffect, useState } from "react";

// MDX Components
const components = {
  // Custom code block with copy button
  pre: (props) => <CodeBlock {...props} />,
  // Custom link styling
  a: (props) => (
    <a
      {...props}
      className="text-coffee-600 dark:text-coffee-300 hover:text-coffee-700 dark:hover:text-coffee-200 underline"
    />
  ),
};

/**
 * Individual blog post page component
 * @param {Object} props - Component props
 * @param {Object} props.post - Blog post metadata
 * @param {Object} props.mdxSource - Serialized MDX content
 * @returns {JSX.Element} The blog post detail page
 */
export default function BlogPost({ post, mdxSource }) {
  const { theme } = useTheme();
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");

  // Extract headings for table of contents
  useEffect(() => {
    const articleElement = document.querySelector("article");
    if (articleElement) {
      const headingElements = articleElement.querySelectorAll("h2, h3");
      const headingData = Array.from(headingElements).map((heading) => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)),
      }));
      setHeadings(headingData);
    }

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headingElements.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-coffee-700 dark:text-white/70">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} • Mr. Natural</title>
        <meta name="description" content={post.preview} />
      </Head>
      <div className="py-10 px-5">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6 max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-block bg-coffee-200 dark:bg-white/10 hover:bg-coffee-300 dark:hover:bg-white/20 text-coffee-900 dark:text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          <div className="flex gap-8 relative">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Banner Image */}
              <img
                alt={post.title}
                src={post.image}
                className="w-full h-48 md:h-64 object-cover rounded-lg mb-6 border border-coffee-300 dark:border-white/10"
              />

              {/* Blog Post Header */}
              <article>
                <header className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-coffee-900 dark:text-white mb-3">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-coffee-600 dark:text-white/50 mb-3">
                    <time>{new Date(post.date).toLocaleDateString()}</time>
                    <span>•</span>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium bg-coffee-200 dark:bg-white/10 text-coffee-700 dark:text-white/70 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                {/* MDX Content */}
                <div className="prose prose-coffee dark:prose-dark max-w-none mb-12">
                  <MDXRemote {...mdxSource} components={components} />
                </div>
              </article>

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t-2 border-coffee-300 dark:border-white/10">
                <h2 className="text-2xl font-subheading font-bold text-coffee-900 dark:text-white mb-6">
                  Comments
                </h2>
                <Giscus
                  repo="itsmrnatural/my-website"
                  repoId="YOUR_REPO_ID"
                  category="General"
                  categoryId="YOUR_CATEGORY_ID"
                  mapping="pathname"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme={theme === "dark" ? "dark" : "light"}
                  lang="en"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            {headings.length > 0 && (
              <aside className="hidden xl:block w-64 sticky top-20 self-start">
                <nav className="bg-coffee-100 dark:bg-white/5 rounded-lg p-4 border border-coffee-300 dark:border-white/10">
                  <h3 className="text-sm font-subheading font-semibold text-coffee-900 dark:text-white mb-3">
                    Table of Contents
                  </h3>
                  <ul className="space-y-2">
                    {headings.map((heading) => (
                      <li key={heading.id} className={heading.level === 3 ? "ml-3" : ""}>
                        <a
                          href={`#${heading.id}`}
                          className={`text-xs block py-1 transition-colors ${
                            activeId === heading.id
                              ? "text-coffee-900 dark:text-white font-medium"
                              : "text-coffee-600 dark:text-gray-400 hover:text-coffee-800 dark:hover:text-gray-200"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }}
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Get static paths for all blog posts
 * @returns {Object} Paths and fallback configuration
 */
export async function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

/**
 * Get static props for a specific blog post
 * @param {Object} context - Next.js context
 * @returns {Object} Props containing post data and MDX source
 */
export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, [remarkFootnotes, { inlineNotes: true }]],
      rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
    },
  });

  return {
    props: {
      post: {
        slug: post.slug,
        title: post.title,
        date: post.date,
        author: post.author,
        image: post.image,
        preview: post.preview,
        tags: post.tags,
        readingTime: post.readingTime,
      },
      mdxSource,
    },
  };
}
