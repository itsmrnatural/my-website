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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-70 animate-glitch"></div>
          404
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
      <style jsx>{`
        .animate-glitch {
          animation: glitch 1s infinite linear alternate-reverse;
        }
        @keyframes glitch {
          0% {
            transform: skew(0deg);
            opacity: 1;
          }
          20% {
            transform: skew(-20deg);
            opacity: 0.7;
          }
          40% {
            transform: skew(20deg);
            opacity: 0.5;
          }
          60% {
            transform: skew(0deg);
            opacity: 0.8;
          }
          80% {
            transform: skew(0deg);
            opacity: 0.4;
          }
          to {
            transform: skew(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
