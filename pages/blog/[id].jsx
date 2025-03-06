import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import blogs from "../../public/blogData";
import { useRouter } from "next/router";

export default function BlogPost() {
  const [blog, setBlogPost] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const blog = blogs.find((blog) => blog.slug === id);
    setBlogPost(blog);
  }, [router.query.slug, blog]);

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <div className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/blog">
              <button className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg">
                ← Back to Blog
              </button>
            </Link>
          </div>
          <img alt={blog.title} src={blog.image} className="w-full h-40 object-cover rounded-lg" />
          <br />
          <div className="flex flex-col">
            <h1 className="text-4xl text-white font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-400 mb-4">{`By ${blog.author} on ${blog.date}`}</p>
          </div>
          <p className="text-gray-100">{blog.content}</p>
        </div>
      </div>
    </>
  );
}
