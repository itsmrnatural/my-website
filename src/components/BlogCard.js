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
  // helper: simple hash to pick gradient deterministically
  const hash = (str) => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  };

  const gradients = [
    "bg-gradient-to-br from-pink-200 via-red-200 to-yellow-200",
    "bg-gradient-to-br from-green-200 via-teal-200 to-blue-200",
    "bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200",
    "bg-gradient-to-br from-indigo-200 via-blue-200 to-teal-200",
    "bg-gradient-to-br from-amber-200 via-yellow-200 to-orange-200",
  ];

  const key = blog.slug || blog.title || "default";
  const grad = gradients[hash(key.toString()) % gradients.length];

  const emoji = blog.emoji || (blog.title ? blog.title[0] : "✍️");

  return (
    <div className="bg-coffee-50 dark:bg-white/5 hover:bg-coffee-100 dark:hover:bg-white/10 rounded-lg overflow-hidden relative shadow-sm border border-coffee-200 dark:border-white/10 transition-all duration-200 h-full flex flex-col">
      {/* Media area: either image or emoji gradient */}
      <div className="w-full h-28 relative flex-shrink-0">
        {blog.image ? (
          <>
            <Image
              src={blog.image}
              alt={blog.title}
              width={1024}
              height={512}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black/30"></div>
          </>
        ) : (
          <div className={`w-full h-full ${grad} relative overflow-hidden`}>
            {/* Large faint background emoji - tilted on the right, overflowing */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-15 dark:opacity-8">
              <span
                className="text-[10rem] md:text-[12rem] block transform rotate-12"
                aria-hidden
                style={{ filter: "blur(2px)" }}
              >
                {emoji}
              </span>
            </div>

            {/* Small solid foreground emoji - bottom left */}
            <div className="absolute bottom-2 left-2">
              <span className="text-4xl md:text-5xl drop-shadow-lg" aria-hidden>
                {emoji}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-heading font-semibold text-coffee-900 dark:text-white mb-1.5 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-xs text-coffee-600 dark:text-gray-400 mb-2">
          {blog.author} • {new Date(blog.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
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
