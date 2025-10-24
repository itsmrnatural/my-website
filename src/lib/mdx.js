import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDirectory = path.join(process.cwd(), "content/blog");

/**
 * Get all blog posts from the content directory
 * @returns {Array} Array of blog post objects with metadata
 */
export function getAllPosts() {
  // Create content directory if it doesn't exist
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || new Date().toISOString(),
        author: data.author || "Unknown",
        image: data.image || null,
        emoji: data.emoji || null,
        preview: data.preview || data.description || "",
        tags: data.tags || [],
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return posts;
}

/**
 * Get a single blog post by slug
 * @param {string} slug - The slug of the blog post
 * @returns {Object|null} Blog post object with metadata and content
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get all unique tags from all posts
 * @returns {Array} Array of tag objects with counts
 */
export function getAllTags() {
  const posts = getAllPosts();
  const tagCount = {};

  posts.forEach((post) => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts by tag
 * @param {string} tag - The tag to filter by
 * @returns {Array} Array of blog posts with the specified tag
 */
export function getPostsByTag(tag) {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags && post.tags.includes(tag));
}
