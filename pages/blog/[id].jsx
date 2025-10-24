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
      const headingElements = articleElement.querySelectorAll("h2, h3, h4, h5");
      const headingData = Array.from(headingElements).map((heading) => {
        // Clone the heading to manipulate it
        const clone = heading.cloneNode(true);
        // Remove footnote references (sup elements)
        clone.querySelectorAll("sup").forEach((sup) => sup.remove());
        return {
          id: heading.id,
          text: clone.textContent,
          level: parseInt(heading.tagName.charAt(1)),
        };
      });
      setHeadings(headingData);

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
    }
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
      <div className="py-20 px-5">
        <div className="max-w-7xl mx-auto flex gap-8">
          {/* Left spacer */}
          <div className="hidden xl:block flex-1"></div>

          {/* Main Content - Centered */}
          <div className="max-w-3xl flex-shrink-0 w-full">
            {/* Back Button */}
            <div className="mb-6">
              <Link
                href="/blog"
                className="inline-block bg-coffee-200 dark:bg-white/10 hover:bg-coffee-300 dark:hover:bg-white/20 text-coffee-900 dark:text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                ← Back to Blog
              </Link>
            </div>

            {/* Banner Image or Emoji Gradient */}
            {post.image ? (
              <img
                alt={post.title}
                src={post.image}
                className="w-full h-64 object-cover rounded-lg mb-8 border border-coffee-300 dark:border-white/10"
              />
            ) : (
              <div className="w-full h-64 rounded-lg mb-8 border border-coffee-300 dark:border-white/10 bg-gradient-to-br from-coffee-200 via-coffee-300 to-coffee-400 dark:from-coffee-800 dark:via-coffee-700 dark:to-coffee-600 flex items-center justify-center">
                <span className="text-8xl filter drop-shadow-lg">{post.emoji || "✍️"}</span>
              </div>
            )}

            {/* Blog Post Header */}
            <article>
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white mb-4">
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
              <div className="prose prose-coffee dark:prose-dark max-w-none mb-12 prose-compact">
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
                repoId="R_kgDOJIewxA"
                category="General"
                categoryId="DIC_kwDOJIewxM4CndAM"
                mapping="pathname"
                strict="0"
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
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
                <nav className="bg-coffee-100 dark:bg-white/5 rounded-lg p-4 border border-coffee-300 dark:border-white/10 shadow-sm">
                  <h3 className="text-sm font-subheading font-semibold text-coffee-900 dark:text-white mb-3 pb-2 border-b border-coffee-300 dark:border-white/10">
                    On This Page
                  </h3>
                  <ul className="space-y-1">
                    {headings.map((heading) => {
                      // Calculate indentation based on heading level
                      const indentClass =
                        heading.level === 2
                          ? ""
                          : heading.level === 3
                            ? "ml-3"
                            : heading.level === 4
                              ? "ml-6"
                              : heading.level === 5
                                ? "ml-9"
                                : "";

                      return (
                        <li key={heading.id} className={indentClass}>
                          <a
                            href={`#${heading.id}`}
                            className={`text-xs block py-1.5 px-2 rounded transition-all break-words ${
                              activeId === heading.id
                                ? "bg-coffee-200 dark:bg-white/10 text-coffee-900 dark:text-white font-medium"
                                : "text-coffee-600 dark:text-gray-400 hover:text-coffee-800 dark:hover:text-gray-200 hover:bg-coffee-50 dark:hover:bg-white/5"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(heading.id);
                              if (element) {
                                const headerOffset = 100; // Account for sticky header
                                const elementPosition = element.getBoundingClientRect().top;
                                const offsetPosition =
                                  elementPosition + window.pageYOffset - headerOffset;

                                window.scrollTo({
                                  top: offsetPosition,
                                  behavior: "smooth",
                                });
                              }
                            }}
                          >
                            {heading.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>
          )}
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
        emoji: post.emoji,
        preview: post.preview,
        tags: post.tags,
        readingTime: post.readingTime,
      },
      mdxSource,
    },
  };
}
