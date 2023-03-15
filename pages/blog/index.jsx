import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import BlogCard from "@components/BlogCard";
import blogs from "../../public/blogData";

export default function Blog() {
    return (
        <>
            <Head>
                <title>Mr. Natural • Blog</title>
            </Head>
            <div className="py-20 px-5">
                <p className="text-3xl text-white font-semibold text-left">
                    Blog
                </p>
                <p className="text-xl text-white/50 font-normal text-left mb-5">
                    Here are some of the blog posts I have written.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                    {blogs.map((blog) => (
                        <Link href={`/blog/${blog.slug}`} key={blog.slug}>
                            <a href={`/blog/${blog.slug}`}>
                                <BlogCard blog={blog} />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
