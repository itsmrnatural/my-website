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
              <p className="text-xs font-medium bg-gradient-to-r from-fuchsia-400 to-violet-500 text-transparent bg-clip-text tracking-wider">
                STUDENT • PROGRAMMER • COFFEE ADDICT
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
              I discovered my passion for programming at 14, and five years later, that spark hasn't
              faded—it's only grown stronger. Along the way, I've fallen in love with the indie music
              scene, become captivated by the storytelling in anime and manga, and developed what can
              only be described as a{" "}
              <Tippy content={`${coffeeCount} cups today... so far 😅`} placement="top">
                <span className="text-fuchsia-400 cursor-help font-medium">severe coffee addiction</span>
              </Tippy>
              . Welcome to my little corner of the internet! ☕
            </motion.p>

            {/* Coffee Counter Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCoffeeCount(coffeeCount + 1)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-amber-900/30 flex items-center gap-2"
            >
              <i className="fas fa-coffee"></i>
              Buy me a coffee (virtually) • {coffeeCount}
            </motion.button>
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

      {/* GPG Key Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-11 md:mt-14"
      >
        <GpgKeyButton />
      </motion.div>

      {/* Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="mt-8 backdrop-blur-sm rounded-lg p-5 border border-white/10"
      >
        <blockquote className="italic text-gray-200 text-base relative">
          <div className="absolute -top-5 -left-3 text-3xl text-fuchsia-400/70">"</div>
          <div className="pl-4">
            Having spent the whole last year at home, I came to realize that I may not be the
            introvert I thought I was. Though I might not speak much when I'm with friends, I do
            genuinely enjoy their company and the humor they bring to my life. Turns out, even
            introverts need people—just in smaller, carefully curated doses. 😊
            <footer className="text-right mt-3 text-xs text-gray-400 pr-3">
              — Me, reflecting while caffeinated
            </footer>
          </div>
          <div className="absolute bottom-0 right-2 text-3xl text-violet-400/70">"</div>
        </blockquote>
      </motion.div>

      {/* Technologies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        className="mt-8 pb-5 border-b border-white/10"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <i className="fas fa-code text-fuchsia-400 mr-2.5 text-sm"></i>
          Tech Stack & Tools I Love
        </h2>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400 mb-2">Fluent in:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Python", icon: "fab fa-python", color: "text-blue-400" },
                { name: "JavaScript", icon: "fab fa-js-square", color: "text-yellow-400" },
                { name: "React", icon: "fab fa-react", color: "text-cyan-400" },
                { name: "Tailwind CSS", icon: "fas fa-wind", color: "text-teal-400" },
              ].map((tech) => (
                <Tippy key={tech.name} content={`I love ${tech.name}!`} placement="top">
                  <motion.span
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-2 bg-white/5 border border-white/10 hover:border-fuchsia-500/40 hover:bg-white/10 transition-all duration-300 rounded-md text-xs font-medium cursor-pointer flex items-center gap-2"
                  >
                    <i className={`${tech.icon} ${tech.color}`}></i>
                    {tech.name}
                  </motion.span>
                </Tippy>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-400 mb-2">Currently learning:</p>
            <div className="flex flex-wrap gap-2">
              {["C", "Haskell", "Rust"].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 hover:border-violet-500/50 hover:bg-violet-500/20 transition-all duration-300 rounded-md text-xs font-medium text-violet-300"
                >
                  <i className="fas fa-graduation-cap mr-1.5"></i>
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* What I'm Up To Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        className="mt-8 pb-5 relative"
      >
        <h2 className="text-lg font-semibold mb-5 flex items-center">
          <i className="fas fa-compass text-fuchsia-400 mr-2.5 text-sm"></i>
          Currently in my world...
        </h2>

        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 5 }}
            className="group border-l-2 border-fuchsia-500/30 pl-4 hover:border-fuchsia-500/70 transition-all bg-white/0 hover:bg-white/5 rounded-r-lg py-2 pr-2"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <i className="fas fa-graduation-cap text-fuchsia-400"></i>
              <h3 className="font-semibold text-sm">📚 Academic Journey</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Preparing for admission to my country's top university. It's a mix of excitement,
              nervousness, and way too many late-night study sessions fueled by (you guessed it)
              coffee. Wish me luck! 🎓
            </p>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            className="group border-l-2 border-violet-500/30 pl-4 hover:border-violet-500/70 transition-all bg-white/0 hover:bg-white/5 rounded-r-lg py-2 pr-2"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <i className="fas fa-coffee text-amber-400"></i>
              <h3 className="font-semibold text-sm">☕ Coffee Chronicles</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Exploring the world of specialty coffee (on a student budget, so it's more window
              shopping than actual shopping). Currently perfecting my pour-over technique and
              pretending I can taste the "notes of chocolate and berries." 😄
            </p>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            className="group border-l-2 border-fuchsia-500/30 pl-4 hover:border-fuchsia-500/70 transition-all bg-white/0 hover:bg-white/5 rounded-r-lg py-2 pr-2"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <i className="fas fa-headphones text-violet-400"></i>
              <h3 className="font-semibold text-sm">🎵 Music & Vibes</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Deep diving into the indie music scene. Check out my{" "}
              <a
                href="#"
                className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
              >
                last.fm profile
              </a>{" "}
              if you're curious about my musical taste (it's eclectic, to say the least).
            </p>
          </motion.div>

          <motion.div
            whileHover={{ x: 5 }}
            className="group border-l-2 border-violet-500/30 pl-4 hover:border-violet-500/70 transition-all bg-white/0 hover:bg-white/5 rounded-r-lg py-2 pr-2"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <i className="fas fa-code text-fuchsia-400"></i>
              <h3 className="font-semibold text-sm">💻 Side Projects</h3>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Building random stuff that interests me—sometimes useful, sometimes just for fun.
              Because what's the point of knowing how to code if you can't make weird things at 3 AM?
            </p>
          </motion.div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/blog" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center text-xs text-fuchsia-400 hover:text-violet-300 transition-colors px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 font-medium"
            >
              <i className="fas fa-blog mr-2"></i>
              Read my blog
              <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
            </motion.a>
          </Link>
          <Link href="/projects" passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center text-xs text-violet-400 hover:text-fuchsia-300 transition-colors px-3 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 font-medium"
            >
              <i className="fas fa-folder-open mr-2"></i>
              View projects
            </motion.a>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
