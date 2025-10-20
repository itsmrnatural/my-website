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
 * Following "Don't Make Me Think" design principles for clear, intuitive UX
 * @returns {JSX.Element} The Home page
 */
const Home = () => {
  return (
    <>
      <Head>
        <title>Mr. Natural • Home</title>
        <meta name="description" content="Student, programmer, and coffee enthusiast." />
        <meta property="og:title" content="Mr. Natural • Personal Website" />
        <meta
          property="og:description"
          content="Personal portfolio and blog of Mr. Natural - Student, programmer, and coffee enthusiast."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://i.imgur.com/isKXF9Q.gif" />
      </Head>

      {/* Hero Section - Clear and focused */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary-dark/50 backdrop-blur-sm rounded-lg w-full h-auto mt-7 md:mt-10 border border-primary-cyan/20"
      >
        <div className="flex flex-col lg:flex-row justify-between w-full p-6 lg:p-8 items-center gap-6">
          {/* Text Content */}
          <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start w-full">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-philosopher font-bold text-primary-light mb-3"
            >
              Hey, I'm Mr. Natural 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-lora text-primary-light/90 text-lg mt-2 max-w-2xl leading-relaxed"
            >
              Student, programmer, and coffee enthusiast. I build things with code and occasionally
              write about it.
            </motion.p>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="order-first lg:order-last flex-shrink-0 relative"
          >
            <div className="w-[160px] h-[160px] rounded-lg overflow-hidden shadow-xl border-2 border-primary-cyan/30">
              <Tippy content="@itsmrnatural" placement="bottom" arrow={true}>
                <div className="relative w-full h-full">
                  <Image
                    alt="Mr. Natural's profile"
                    src="https://i.imgur.com/isKXF9Q.gif"
                    fill
                    sizes="160px"
                    quality={90}
                    className="object-cover"
                  />
                </div>
              </Tippy>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Last.fm Now Playing */}
      <LastFmNowPlaying />

      {/* Clear Call-to-Action Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Link href="/blog" passHref>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center text-base font-karla font-medium px-6 py-3 rounded-lg bg-primary-cyan text-primary-dark hover:bg-primary-cyan/90 transition-all shadow-lg hover:shadow-primary-cyan/20"
          >
            <i className="fas fa-blog mr-2"></i>
            Read Blog
          </motion.a>
        </Link>
        <Link href="/projects" passHref>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center text-base font-karla font-medium px-6 py-3 rounded-lg bg-primary-dark/50 text-primary-light border border-primary-light/20 hover:border-primary-pink/50 hover:text-primary-pink transition-all"
          >
            <i className="fas fa-folder-open mr-2"></i>
            View Projects
          </motion.a>
        </Link>
      </motion.div>
    </>
  );
};

export default Home;
