import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    // Fetch blog data from JSON file
    fetch("/blogData.json")
      .then((response) => response.json())
      .then((data) => setBlogData(data));
  }, []);

  return (
    <>
      <Head>
        <title>Mr. Natural • Blog</title>
      </Head>
      <div className="py-20 px-5">
        <p className="text-3xl text-white font-semibold text-left">Blog</p>
        <p className="text-xl text-white/50 font-normal text-left mb-5">
          Here are some of the blog posts I have written.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {blogData.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="bg-[#242424]/20 hover:bg-[#242424]/30 rounded-lg overflow-hidden border border-gray-900">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={1024}
                  height={512}
                  className="w-half h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-white text-lg font-semibold">
                    {blog.title}
                  </p>
                  <p className="text-gray-400 text-sm">{`By ${blog.author} on ${blog.date}`}</p>
                  <p className="mt-2 text-gray-300">{blog.preview}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
