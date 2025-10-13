import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getBlogBySlug, getAllBlogSlugs } from "@lib/blog";
import { motion } from "framer-motion";
import { format } from "date-fns";

/**
 * Individual blog post page component
 * @returns {JSX.Element} The blog post detail page
 */
export default function BlogPost({ blog }) {
  if (!blog) {
    return (
      <div className="py-20 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white text-xl">Blog post not found</p>
          <Link href="/blog">
            <a className="text-fuchsia-400 hover:text-fuchsia-300 mt-4 inline-block">
              ← Back to Blog
            </a>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = blog.date ? format(new Date(blog.date), "MMMM dd, yyyy") : "";

  return (
    <>
      <Head>
        <title>{blog.title} • Mr. Natural</title>
        <meta name="description" content={blog.preview} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.preview} />
        <meta property="og:image" content={blog.image} />
      </Head>
      <div className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Link href="/blog">
              <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-all flex items-center gap-2">
                <i className="fas fa-arrow-left"></i>
                Back to Blog
              </button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <i className="fas fa-user text-fuchsia-400"></i>
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-calendar text-fuchsia-400"></i>
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Blog Content */}
            <div
              className="prose prose-invert prose-fuchsia max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-fuchsia-400 prose-a:no-underline hover:prose-a:text-fuchsia-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-fuchsia-300 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                prose-blockquote:border-l-4 prose-blockquote:border-fuchsia-500 prose-blockquote:text-gray-300
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:text-gray-300
                prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.article>

          {/* Back to Blog Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 pt-8 border-t border-white/10 text-center"
          >
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 text-fuchsia-400 hover:text-fuchsia-300 transition-colors text-sm font-medium">
                <i className="fas fa-arrow-left"></i>
                Back to all posts
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}

/**
 * Get static paths for all blog posts
 */
export async function getStaticPaths() {
  const slugs = getAllBlogSlugs();
  const paths = slugs.map((slug) => ({
    params: { id: slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

/**
 * Get static props for individual blog post
 */
export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.id);

  return {
    props: {
      blog,
    },
  };
}
