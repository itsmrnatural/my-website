import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Mr. Natural • 404</title>
            </Head>
            <div className="h-screen flex flex-col justify-center items-center bg-black">
                <div className="text-9xl text-white font-bold relative mb-8">
                    <div className="glitch" data-text="404">
                        404
                    </div>
                </div>
                <div className="text-3xl text-white font-semibold mb-8">
                    Oops! The page you're looking for doesn't exist.
                </div>
                <Link href="/">
                    <a className="bg-white text-black py-2 px-4 rounded-lg font-semibold transition-all hover:bg-black hover:text-white">
                        Back to Home
                    </a>
                </Link>
            </div>
        </>
    );
}
