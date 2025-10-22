import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllPosts, getPostBySlug } from "../../lib/mdx";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Giscus from "@giscus/react";
import { useTheme } from "../../contexts/ThemeContext";

// MDX Components
const components = {
  // You can add custom components here
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
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-block bg-coffee-200 dark:bg-white/10 hover:bg-coffee-300 dark:hover:bg-white/20 text-coffee-900 dark:text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>

          {/* Banner Image */}
          <img
            alt={post.title}
            src={post.image}
            className="w-full h-64 object-cover rounded-lg mb-8 border border-coffee-300 dark:border-white/10"
          />

          {/* Blog Post Header */}
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-coffee-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-coffee-600 dark:text-white/60 mb-4">
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <span>•</span>
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-coffee-200 dark:bg-white/10 text-coffee-800 dark:text-white/80 rounded-full"
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
            <h2 className="text-2xl font-heading font-bold text-coffee-900 dark:text-white mb-6">
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
