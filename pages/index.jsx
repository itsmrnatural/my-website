import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GpgKeyButton from "@components/GpgKeyButton";

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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 backdrop-blur-sm rounded-lg w-full h-auto mt-7 md:mt-10 border-b border-white/10"
      >
        <div className="flex flex-col lg:flex-row justify-between w-full p-5 lg:p-7 items-center gap-6">
          <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-2"
            >
              <p className="text-xs font-medium bg-gradient-to-r from-blue-400 to-slate-400 text-transparent bg-clip-text tracking-wider">
                STUDENT • PROGRAMMER • DEVELOPER
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-heading"
            >
              Hey, I'm Mr. Natural 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-base mt-3 max-w-2xl"
            >
              Student, programmer, and coffee enthusiast. I build things with code and occasionally
              write about it.
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="order-first lg:order-last flex-shrink-0 relative"
          >
            <div className="w-[150px] h-[150px] rounded-xl overflow-hidden shadow-lg">
              <Tippy content="@itsmrnatural" placement="bottom" arrow={true}>
                <div className="relative w-full h-full">
                  <Image
                    alt="Mr. Natural's profile"
                    src="https://i.imgur.com/isKXF9Q.gif"
                    fill
                    sizes="150px"
                    quality={90}
                    className="bg-neutral-700 object-cover"
                  />
                </div>
              </Tippy>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex gap-4"
      >
        <Link href="/blog" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 font-medium"
          >
            <i className="fas fa-blog mr-2"></i>
            Read my blog
          </motion.a>
        </Link>
        <Link href="/projects" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center text-sm text-slate-400 hover:text-slate-300 transition-colors px-4 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 font-medium"
          >
            <i className="fas fa-folder-open mr-2"></i>
            View projects
          </motion.a>
        </Link>
      </motion.div>
    </>
  );
};

export default Home;
