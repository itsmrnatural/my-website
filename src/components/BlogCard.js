import Image from "next/image";
import Link from "next/link";

/**
 * BlogCard component for displaying a blog post preview
 * @param {Object} props - Component props
 * @param {Object} props.blog - Blog post object containing title, image, author, date, preview, and tags
 * @returns {JSX.Element} The blog card component
 */
export default function BlogCard(props) {
  const blog = props.blog;

  return (
    <div className="bg-coffee-50 dark:bg-white/5 hover:bg-coffee-100 dark:hover:bg-white/10 rounded-lg overflow-hidden relative shadow-sm border border-coffee-200 dark:border-white/10 transition-all duration-200 h-full flex flex-col">
      <div className="w-full h-32 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1024}
          height={512}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/60"></div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-heading font-bold text-coffee-900 dark:text-white mb-1.5 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-xs text-coffee-600 dark:text-gray-400 mb-2">
          {blog.author} • {new Date(blog.date).toLocaleDateString()}
        </p>
        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-coffee-200 dark:bg-white/10 text-coffee-800 dark:text-white/70 rounded"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs font-medium text-coffee-600 dark:text-white/50">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
