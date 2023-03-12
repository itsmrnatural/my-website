import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogPost() {
  const [blogData, setBlogData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Fetch blog data from JSON file based on id parameter in URL
    const { id } = router.query;
    fetch(`/blogData.json`)
      .then((response) => response.json())
      .then((data) => {
        const blogPost = data.find((blog) => blog.id === parseInt(id));
        setBlogData(blogPost);
      });
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{blogData.title}</title>
      </Head>
      <div className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-40 object-cover"
          />
          <div className="mb-4 flex items-center justify-between">
            <Link href="/blog">
              <button className="text-white font-semibold hover:text-gray-400">
                ← Back to Blog
              </button>
            </Link>
            <br />
          </div>
          <h1 className="text-4xl text-white font-semibold mb-4">
            {blogData.title}
          </h1>
          <p className="text-gray-400 mb-4">
            {`By ${blogData.author} on ${blogData.date}`}
          </p>
          <p className="text-gray-200">{blogData.content}</p>
        </div>
      </div>
    </>
  );
}
