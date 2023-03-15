import Image from "next/image";
import Link from "next/link";

export default function BlogCard(props) {
    const blog = props.blog;

    return (
        <div className="bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden relative">
            <div className="w-half h-36 relative">
                <Image
                    src={blog.image}
                    alt={blog.title}
                    width={1024}
                    height={512}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/90"></div>
            </div>
            <div className="p-3 absolute bottom-0 left-0 w-full">
                <p className="text-white text-lg font-semibold">{blog.title}</p>
                <p className="text-gray-400 text-sm">{`By ${blog.author} on ${blog.date}`}</p>
                <p className="mt-2 text-gray-300">{blog.preview}</p>
            </div>
        </div>
    );
}
