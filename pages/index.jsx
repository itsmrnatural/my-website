import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GpgKeyButton from "@components/GpgKeyButton";
import LastFmNowPlaying from "@components/LastFmNowPlaying";

/**
 * Home page component displaying personal introduction and information
 * @returns {JSX.Element} The Home page
 */
const Home = () => {
  const [coffeeCount, setCoffeeCount] = useState(3);

  return (
    <>
      <Head>
        <title>Mr. Natural • Home</title>
        <meta name="description" content="Student, programmer, and severe coffee addict." />
        <meta property="og:title" content="Mr. Natural • Personal Website" />
        <meta
          property="og:description"
          content="Personal portfolio and blog of Mr. Natural - Student, programmer, and severe coffee addict."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/isKXF9Q.gif" />
      </Head>

      {/* Hero Section with Organic Shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="relative w-full h-auto mt-7 md:mt-10 mb-8"
      >
        {/* Floating blob background */}
        <div className="absolute inset-0 blob flowing-gradient opacity-30 blur-3xl"></div>

        <div className="relative flex flex-col lg:flex-row justify-between w-full p-8 lg:p-12 items-center gap-8">
          {/* Profile Image - Organic Blob Shape */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
            className="order-first flex-shrink-0 relative"
          >
            {/* Animated glow ring */}
            <div className="absolute inset-0 blob-slow bg-gradient-to-r from-blue-500/20 to-slate-500/20 blur-2xl scale-110"></div>

            <Tippy content="@itsmrnatural" placement="bottom" arrow={true}>
              <div className="relative w-[180px] h-[180px] blob overflow-hidden border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                <Image
                  alt="Mr. Natural's profile"
                  src="https://i.imgur.com/isKXF9Q.gif"
                  fill
                  sizes="180px"
                  quality={95}
                  className="bg-neutral-700 object-cover"
                />
              </div>
            </Tippy>
          </motion.div>

          {/* Content - Asymmetric Layout */}
          <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start w-full lg:ml-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Decorative line accent */}
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-slate-500 to-transparent rounded-full"></div>

              <p className="text-xs font-medium bg-gradient-to-r from-blue-400 via-slate-400 to-blue-400 text-transparent bg-clip-text tracking-widest mb-3 animate-pulse">
                STUDENT • PROGRAMMER • DEVELOPER
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-heading mb-4"
            >
              Hey, I'm Mr. Natural 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed max-w-2xl relative"
            >
              <span className="text-blue-400 font-semibold">Student</span>, programmer, and coffee
              enthusiast. I build things with code and occasionally write about it.
            </motion.p>

            {/* Decorative wave accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-4 w-32 h-1 bg-gradient-to-r from-blue-500 to-transparent"
              style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0% 100%)" }}
            ></motion.div>
          </div>
        </div>
      </motion.div>

      {/* Last.fm Now Playing */}
      <LastFmNowPlaying />

      {/* Quick Links - Organic Pill Shapes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Link href="/blog" passHref>
          <motion.a
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center text-sm px-8 py-4 font-medium overflow-hidden group"
            style={{
              borderRadius: "60px 20px 50px 30px",
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))",
              border: "2px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            {/* Animated background blob */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blob-slow"></div>

            <i className="fas fa-blog mr-3 text-blue-400 relative z-10"></i>
            <span className="text-blue-300 group-hover:text-blue-200 transition-colors relative z-10">
              Read my blog
            </span>
          </motion.a>
        </Link>

        <Link href="/projects" passHref>
          <motion.a
            whileHover={{ scale: 1.08, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center text-sm px-8 py-4 font-medium overflow-hidden group"
            style={{
              borderRadius: "30px 50px 30px 60px",
              background:
                "linear-gradient(135deg, rgba(148, 163, 184, 0.15), rgba(148, 163, 184, 0.05))",
              border: "2px solid rgba(148, 163, 184, 0.3)",
            }}
          >
            {/* Animated background blob */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blob-slow"></div>

            <i className="fas fa-folder-open mr-3 text-slate-400 relative z-10"></i>
            <span className="text-slate-300 group-hover:text-slate-200 transition-colors relative z-10">
              View projects
            </span>
          </motion.a>
        </Link>
      </motion.div>
    </>
  );
};

export default Home;
