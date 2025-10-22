import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Home page component displaying personal introduction and information
 * @returns {JSX.Element} The Home page
 */
const Home = () => {
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
        className="bg-coffee-100 dark:bg-white/5 backdrop-blur-sm rounded-lg w-full h-auto mt-7 md:mt-10 border-b border-coffee-300 dark:border-white/10"
      >
        <div className="flex flex-col lg:flex-row justify-between w-full p-5 lg:p-7 items-center gap-6">
          <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-2"
            >
              <p className="text-xs font-medium bg-gradient-to-r from-fuchsia-400 to-violet-500 text-transparent bg-clip-text tracking-wider">
                STUDENT • PROGRAMMER • COFFEE ADDICT
              </p>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-coffee-900 dark:text-white"
            >
              Hey, I'm Mr. Natural 👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-coffee-700 dark:text-gray-300 text-base mt-3 max-w-2xl"
            >
              I had this interest in programming since I was 14 and now after 5 years, I still love
              to do this. Along the way I have picked up interests in things I might have not even
              thought of when I was younger. Like serious love for the indie music community, great
              appreciation for anime's and manga's way of storytelling, and a severe addiction to
              coffee.
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-11 md:mt-14 bg-coffee-100 dark:bg-transparent backdrop-blur-sm rounded-lg p-5 border border-coffee-300 dark:border-white/10"
      >
        <blockquote className="italic text-coffee-800 dark:text-gray-200 text-base relative">
          <div className="absolute -top-5 -left-3 text-3xl text-fuchsia-400/70">"</div>
          <div className="pl-4">
            Having spent the whole last year at home, I have come to realize that I may not be the
            introvert I thought I was. Though I might not speak much when I am with friends, I do
            genuinely enjoy their company and the humour they bring to my life.
            <footer className="text-right mt-3 text-xs text-coffee-600 dark:text-gray-400 pr-3">
              — Me, while alone and bored.
            </footer>
          </div>
          <div className="absolute bottom-0 right-2 text-3xl text-violet-400/70">"</div>
        </blockquote>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 border-b border-coffee-300 dark:border-white/10"
      >
        <h2 className="text-lg font-heading font-semibold text-coffee-900 dark:text-white mb-4 flex items-center">
          <i className="fas fa-code text-fuchsia-400 mr-2.5 text-sm"></i>
          Technologies I like to tinker with
        </h2>

        <div className="flex flex-wrap gap-2">
          {["Python", "JavaScript", "React", "Tailwind CSS", "C++", "Rust", "Elixir"].map(
            (tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1.5 bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:border-fuchsia-500/30 hover:bg-coffee-200 dark:hover:bg-white/10 transition-all duration-300 rounded-md text-xs font-medium text-coffee-900 dark:text-white"
              >
                {tech}
              </motion.span>
            )
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 relative"
      >
        <h2 className="text-lg font-heading font-semibold text-coffee-900 dark:text-white mb-5 flex items-center">
          <i className="fas fa-compass text-fuchsia-400 mr-2.5 text-sm"></i>
          What I'm up to lately
        </h2>

        <div className="space-y-6">
          <div className="group border-l-2 border-fuchsia-500/30 pl-3.5 hover:border-fuchsia-500/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-books text-fuchsia-400 mr-2 text-xs"></i>
              <h3 className="font-medium text-sm text-coffee-900 dark:text-white">
                Learning & Studying
              </h3>
            </div>
            <p className="text-coffee-700 dark:text-gray-400 mt-1.5 text-xs leading-relaxed">
              This year I'll get into the best university my country offers, and I'm excited and
              nervous at the same time. I'm studying hard to get into the university.
            </p>
          </div>

          <div className="group border-l-2 border-violet-500/30 pl-3.5 hover:border-violet-500/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-coffee text-violet-400 mr-2 text-xs"></i>
              <h3 className="font-medium text-sm text-coffee-900 dark:text-white">
                Coffee Explorations
              </h3>
            </div>
            <p className="text-coffee-700 dark:text-gray-400 mt-1.5 text-xs leading-relaxed">
              I might need to try out other coffee type and variations too, but that's a rich man's
              luxury.
            </p>
          </div>

          <div className="group border-l-2 border-fuchsia-500/30 pl-3.5 hover:border-fuchsia-500/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-headphones text-fuchsia-400 mr-2 text-xs"></i>
              <h3 className="font-medium text-sm text-coffee-900 dark:text-white">
                Music Interests
              </h3>
            </div>
            <p className="text-coffee-700 dark:text-gray-400 mt-1.5 text-xs leading-relaxed">
              You could view my music interest on my last.fm profile, that should be in the upper
              right hand corner hopefully.
            </p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <Link href="/blog">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center text-xs text-fuchsia-400 hover:text-violet-300 transition-colors px-2.5 py-1 rounded-md bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:bg-coffee-200 dark:hover:bg-white/10"
            >
              Read more on my blog
              <i className="fas fa-arrow-right ml-1.5 text-[10px]"></i>
            </motion.a>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
