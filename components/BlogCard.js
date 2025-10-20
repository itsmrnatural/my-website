import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

/**
 * BlogCard component for displaying a blog post preview
 * Following "Don't Make Me Think" - clear visual hierarchy and readable layout
 * @param {Object} props - Component props
 * @param {Object} props.blog - Blog post object containing title, image, author, date, and preview
 * @returns {JSX.Element} The blog card component
 */
export default function BlogCard(props) {
  const blog = props.blog;
  const formattedDate = blog.date ? format(new Date(blog.date), "MMM dd, yyyy") : "";

  return (
    <div className="bg-primary-dark/30 hover:bg-primary-dark/50 rounded-lg overflow-hidden relative transition-all duration-300 hover:scale-[1.01] border border-primary-cyan/20 hover:border-primary-cyan/40 group h-80 hover:shadow-lg hover:shadow-primary-cyan/10">
      {/* Image Section */}
      <div className="w-full h-40 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1024}
          height={512}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary-dark/40 to-primary-dark/90"></div>

        {/* Tags overlay - Clear categorization */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-primary-cyan/90 text-primary-dark text-xs rounded-md font-karla font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Section - Clear hierarchy */}
      <div className="p-4 flex flex-col h-40">
        <h3 className="font-philosopher text-primary-light text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary-cyan transition-colors">
          {blog.title}
        </h3>

        {/* Metadata - Clear and scannable */}
        <div className="flex items-center gap-3 text-primary-light/60 text-xs mb-2 font-karla">
          <span className="flex items-center gap-1">
            <i className="fas fa-calendar text-primary-cyan"></i>
            {formattedDate}
          </span>
          {blog.readingTime && (
            <span className="flex items-center gap-1">
              <i className="fas fa-clock text-primary-cyan"></i>
              {blog.readingTime} min
            </span>
          )}
        </div>

        {/* Preview text - Readable */}
        <p className="font-lora text-primary-light/80 text-sm line-clamp-3 flex-1">
          {blog.preview}
        </p>

        {/* Call to action - Clear affordance */}
        <div className="mt-2 pt-2 border-t border-primary-cyan/20">
          <span className="text-primary-cyan text-xs font-karla font-medium group-hover:text-primary-pink transition-colors inline-flex items-center gap-1">
            Read more
            <i className="fas fa-arrow-right text-[10px]"></i>
          </span>
        </div>
      </div>
    </div>
  );
}
