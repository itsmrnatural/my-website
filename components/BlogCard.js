import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

/**
 * BlogCard component for displaying a blog post preview
 * @param {Object} props - Component props
 * @param {Object} props.blog - Blog post object containing title, image, author, date, and preview
 * @returns {JSX.Element} The blog card component
 */
export default function BlogCard(props) {
  const blog = props.blog;
  const formattedDate = blog.date ? format(new Date(blog.date), "MMM dd, yyyy") : "";

  return (
    <div
      className="relative overflow-hidden transition-all duration-500 hover:scale-[1.03] group h-80"
      style={{
        borderRadius: "40% 60% 50% 50% / 60% 30% 70% 40%",
        background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        border: "2px solid rgba(59, 130, 246, 0.1)",
      }}
    >
      {/* Animated glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)",
        }}
      ></div>

      {/* Image section with organic mask */}
      <div className="w-full h-40 relative">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1024}
            height={512}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/70 to-black"></div>

        {/* Tags with organic pill shapes */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {blog.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={tag}
                className="px-3 py-1 text-white text-xs font-medium backdrop-blur-sm"
                style={{
                  borderRadius: idx === 0 ? "20px 10px 20px 10px" : "10px 20px 10px 20px",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7))",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-5 flex flex-col h-40 relative z-10">
        <h3 className="text-white text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
          {blog.title}
        </h3>

        {/* Metadata with organic separator */}
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            {formattedDate}
          </span>
          {blog.readingTime && (
            <>
              <span className="text-blue-500/50">•</span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                {blog.readingTime} min
              </span>
            </>
          )}
        </div>

        <p className="text-gray-300 text-sm line-clamp-3 flex-1 leading-relaxed">{blog.preview}</p>

        {/* Read more with flowing underline */}
        <div className="mt-3 pt-3 relative">
          <div className="absolute top-0 left-0 h-px bg-gradient-to-r from-blue-500 via-blue-400 to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
          <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors inline-flex items-center gap-2">
            Read more
            <i className="fas fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
