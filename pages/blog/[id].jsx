import {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

export default function BlogPost() {
    const [blogData, setBlogData] = useState({})
    const router = useRouter()

    useEffect(() => {
        // Fetch blog data from JSON file based on id parameter in URL
        const {id} = router.query
        fetch(`/blogData.json`)
            .then((response) => response.json())
            .then((data) => {
                const blogPost = data.find((blog) => blog.id === parseInt(id))
                setBlogData(blogPost)
            })
    }, [router.query])

    return (
        <>
            <Head>
                <title>{blogData.title}</title>
            </Head>
            <div className="py-20 px-5">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-4 flex items-center justify-between">
                        <Link href="/blog">
                            <button className="bg-[#242424]/20 hover:bg-[#242424]/40 text-white text-sm px-3 py-2 rounded-lg">
                                ← Back to Blog
                            </button>
                        </Link>
                    </div>
                    <img
                        alt={blogData.title}
                        src={blogData.image}
                        className="w-full h-40 object-cover rounded-lg"
                    />
                    <br />
                    <div className="flex flex-col">
                        <h1 className="text-4xl text-white font-bold mb-4">
                            {blogData.title}
                        </h1>
                        <p className="text-gray-400 mb-4">
                            {`By ${blogData.author} on ${blogData.date}`}
                        </p>
                    </div>
                    <p className="text-gray-100">{blogData.content}</p>
                </div>
            </div>
        </>
    )
}
