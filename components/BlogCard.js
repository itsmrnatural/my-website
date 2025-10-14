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
    <div className="bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden relative transition-all duration-300 hover:scale-[1.02] border border-white/5 hover:border-white/20 group h-80">
      <div className="w-full h-40 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1024}
          height={512}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/90"></div>

        {/* Tags overlay */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-emerald-500/90 text-white text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col h-40">
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2 group-hover:text-emerald-300 transition-colors">
          {blog.title}
        </h3>
        <div className="flex items-center gap-3 text-gray-400 text-xs mb-2">
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar text-emerald-400"></i>
            {formattedDate}
          </span>
          {blog.readingTime && (
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-emerald-400"></i>
              {blog.readingTime} min
            </span>
          )}
        </div>
        <p className="text-gray-300 text-sm line-clamp-3 flex-1">{blog.preview}</p>
        <div className="mt-2 pt-2 border-t border-white/10">
          <span className="text-emerald-400 text-xs font-medium group-hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
            Read more
            <i className="fas fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
