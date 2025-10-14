import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const blogDirectory = path.join(process.cwd(), "content/blog");

/**
 * Calculate reading time for blog content
 * @param {string} content - The blog content
 * @returns {number} Estimated reading time in minutes
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}

/**
 * Get all blog post slugs
 * @returns {string[]} Array of blog post slugs
 */
export function getAllBlogSlugs() {
  try {
    const fileNames = fs.readdirSync(blogDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading blog directory:", error);
    return [];
  }
}

/**
 * Get all blog posts with metadata
 * @returns {Array} Array of blog post objects with metadata
 */
export function getAllBlogs() {
  const slugs = getAllBlogSlugs();
  const blogs = slugs
    .map((slug) => {
      const fileContents = fs.readFileSync(path.join(blogDirectory, `${slug}.md`), "utf8");
      const { data, content } = matter(fileContents);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        author: data.author || "Mr. Natural",
        tags: data.tags || [],
        image: data.image || "https://i.imgur.com/6Q3qeku.jpg",
        preview: data.excerpt || "",
        readingTime,
        ...data,
      };
    })
    .sort((a, b) => {
      // Sort by date, most recent first
      return new Date(b.date) - new Date(a.date);
    });

  return blogs;
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The blog post slug
 * @returns {Object} Blog post object with content and metadata
 */
export async function getBlogBySlug(slug) {
  try {
    const fileContents = fs.readFileSync(path.join(blogDirectory, `${slug}.md`), "utf8");
    const { data, content } = matter(fileContents);
    const readingTime = calculateReadingTime(content);

    // Process markdown to HTML with syntax highlighting
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      author: data.author || "Mr. Natural",
      tags: data.tags || [],
      image: data.image || "https://i.imgur.com/6Q3qeku.jpg",
      preview: data.excerpt || "",
      content: contentHtml,
      readingTime,
      ...data,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique tags from all blog posts
 * @returns {string[]} Array of unique tags
 */
export function getAllTags() {
  const blogs = getAllBlogs();
  const tags = new Set();
  blogs.forEach((blog) => {
    if (blog.tags) {
      blog.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

/**
 * Search blogs by title, content, or tags
 * @param {string} query - Search query
 * @returns {Array} Filtered array of blog posts
 */
export function searchBlogs(query) {
  const blogs = getAllBlogs();
  const lowerQuery = query.toLowerCase();

  return blogs.filter((blog) => {
    const titleMatch = blog.title.toLowerCase().includes(lowerQuery);
    const previewMatch = blog.preview.toLowerCase().includes(lowerQuery);
    const tagsMatch = blog.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

    return titleMatch || previewMatch || tagsMatch;
  });
}
