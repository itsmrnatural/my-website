import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomCursor from "@components/CustomCursor";

/**
 * Home page component displaying personal introduction and information
 * @returns {JSX.Element} The Home page
 */
const Home = () => {
  const [gpgCopied, setGpgCopied] = useState(false);

  const copyGPGKey = () => {
    const gpgFingerprint = "92EA 052E 2457 66B4 D849  4D5B 3D28 0550 B702 CBB9";
    navigator.clipboard.writeText(gpgFingerprint);
    setGpgCopied(true);
    setTimeout(() => setGpgCopied(false), 2000);
  };

  return (
    <>
      <CustomCursor />
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
              <p className="text-xs font-medium bg-gradient-to-r from-coffee-600 to-coffee-800 dark:from-coffee-400 dark:to-coffee-200 text-transparent bg-clip-text tracking-wider">
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
          <div className="absolute -top-5 -left-3 text-3xl text-coffee-500/70 dark:text-coffee-400/70">"</div>
          <div className="pl-4">
            Having spent the whole last year at home, I have come to realize that I may not be the
            introvert I thought I was. Though I might not speak much when I am with friends, I do
            genuinely enjoy their company and the humour they bring to my life.
            <footer className="text-right mt-3 text-xs text-coffee-600 dark:text-gray-400 pr-3">
              — Me, while alone and bored.
            </footer>
          </div>
          <div className="absolute bottom-0 right-2 text-3xl text-coffee-500/70 dark:text-coffee-400/70">"</div>
        </blockquote>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 border-b border-coffee-300 dark:border-white/10"
      >
        <h2 className="text-lg font-subheading font-semibold text-coffee-900 dark:text-white mb-5 flex items-center">
          <i className="fas fa-code text-coffee-600 dark:text-coffee-400 mr-2.5 text-sm"></i>
          Tech Arsenal
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-subheading font-medium text-coffee-800 dark:text-gray-300 mb-3">
              Fluent In
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  name: "Python",
                  icon: "https://skillicons.dev/icons?i=py",
                  link: "https://www.python.org/",
                },
                {
                  name: "JavaScript",
                  icon: "https://skillicons.dev/icons?i=js",
                  link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                },
                {
                  name: "HTML",
                  icon: "https://skillicons.dev/icons?i=html",
                  link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
                },
                {
                  name: "CSS",
                  icon: "https://skillicons.dev/icons?i=css",
                  link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
                },
              ].map((tech) => (
                <Tippy key={tech.name} content={tech.name} placement="top">
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2 bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:border-coffee-500/50 hover:bg-coffee-200 dark:hover:bg-white/10 transition-all duration-300 rounded-lg"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                  </a>
                </Tippy>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-subheading font-medium text-coffee-800 dark:text-gray-300 mb-3">
              Currently Learning
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  name: "C",
                  icon: "https://skillicons.dev/icons?i=c",
                  link: "https://en.cppreference.com/w/c/language",
                },
                {
                  name: "Haskell",
                  icon: "https://skillicons.dev/icons?i=haskell",
                  link: "https://www.haskell.org/",
                },
              ].map((tech) => (
                <Tippy key={tech.name} content={tech.name} placement="top">
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2 bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:border-coffee-500/50 hover:bg-coffee-200 dark:hover:bg-white/10 transition-all duration-300 rounded-lg"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                  </a>
                </Tippy>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-subheading font-medium text-coffee-800 dark:text-gray-300 mb-3">
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  name: "Git",
                  icon: "https://skillicons.dev/icons?i=git",
                  link: "https://git-scm.com/",
                },
                {
                  name: "GitHub",
                  icon: "https://skillicons.dev/icons?i=github",
                  link: "https://github.com/",
                },
                {
                  name: "VS Code",
                  icon: "https://skillicons.dev/icons?i=vscode",
                  link: "https://code.visualstudio.com/",
                },
                {
                  name: "Helix",
                  icon: "https://go-skill-icons.vercel.app/api/icons?i=helix",
                  link: "https://helix-editor.com/",
                },
              ].map((tech) => (
                <Tippy key={tech.name} content={tech.name} placement="top">
                  <a
                    href={tech.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-2 bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:border-coffee-500/50 hover:bg-coffee-200 dark:hover:bg-white/10 transition-all duration-300 rounded-lg"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                  </a>
                </Tippy>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* GPG Key Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 border-b border-coffee-300 dark:border-white/10"
      >
        <h2 className="text-lg font-subheading font-semibold text-coffee-900 dark:text-white mb-4 flex items-center">
          <i className="fas fa-key text-coffee-600 dark:text-coffee-400 mr-2.5 text-sm"></i>
          GPG Public Key
        </h2>
        <div className="bg-coffee-100 dark:bg-white/5 rounded-lg p-4 border border-coffee-300 dark:border-white/10">
          <p className="text-sm text-coffee-700 dark:text-gray-300 mb-3">
            You can import my GPG key fingerprint to verify my commits and encrypt messages to me.
          </p>
          <div className="mb-3">
            <p className="text-xs text-coffee-600 dark:text-gray-400 mb-1 font-semibold">Key Fingerprint:</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <code className="flex-1 bg-coffee-200 dark:bg-black/30 text-coffee-900 dark:text-gray-200 px-3 py-2 rounded text-xs font-mono break-all">
                92EA 052E 2457 66B4 D849 4D5B 3D28 0550 B702 CBB9
              </code>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyGPGKey}
                className="px-4 py-2 bg-coffee-600 hover:bg-coffee-700 dark:bg-coffee-700 dark:hover:bg-coffee-600 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <i className={`fas ${gpgCopied ? "fa-check" : "fa-copy"}`}></i>
                {gpgCopied ? "Copied!" : "Copy Fingerprint"}
              </motion.button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <a
              href="https://raw.githubusercontent.com/itsmrnatural/itsmrnatural/main/public-key.asc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coffee-600 hover:text-coffee-800 dark:text-coffee-400 dark:hover:text-coffee-300 transition-colors"
            >
              <i className="fas fa-download mr-1"></i>
              Download public key (.asc)
            </a>
            <span className="text-coffee-500 dark:text-gray-500">•</span>
            <a
              href="https://keys.openpgp.org/search?q=92EA052E245766B4D8494D5B3D280550B702CBB9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-coffee-600 hover:text-coffee-800 dark:text-coffee-400 dark:hover:text-coffee-300 transition-colors"
            >
              <i className="fas fa-external-link mr-1"></i>
              View on keyserver
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 relative"
      >
        <h2 className="text-lg font-subheading font-semibold text-coffee-900 dark:text-white mb-5 flex items-center">
          <i className="fas fa-compass text-coffee-600 dark:text-coffee-400 mr-2.5 text-sm"></i>
          What I'm up to lately
        </h2>

        <div className="space-y-6">
          <div className="group border-l-2 border-coffee-500/30 pl-3.5 hover:border-coffee-600/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-books text-coffee-600 dark:text-coffee-400 mr-2 text-xs"></i>
              <h3 className="font-subheading font-medium text-sm text-coffee-900 dark:text-white">
                Learning & Studying
              </h3>
            </div>
            <p className="text-coffee-700 dark:text-gray-400 mt-1.5 text-xs leading-relaxed">
              This year I'll get into the best university my country offers, and I'm excited and
              nervous at the same time. I'm studying hard to get into the university.
            </p>
          </div>

          <div className="group border-l-2 border-coffee-500/30 pl-3.5 hover:border-coffee-600/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-coffee text-coffee-600 dark:text-coffee-400 mr-2 text-xs"></i>
              <h3 className="font-subheading font-medium text-sm text-coffee-900 dark:text-white">
                Coffee Explorations
              </h3>
            </div>
            <p className="text-coffee-700 dark:text-gray-400 mt-1.5 text-xs leading-relaxed">
              I might need to try out other coffee type and variations too, but that's a rich man's
              luxury.
            </p>
          </div>

          <div className="group border-l-2 border-coffee-500/30 pl-3.5 hover:border-coffee-600/70 transition-all">
            <div className="flex items-center">
              <i className="fas fa-headphones text-coffee-600 dark:text-coffee-400 mr-2 text-xs"></i>
              <h3 className="font-subheading font-medium text-sm text-coffee-900 dark:text-white">
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
          <Link
            href="/blog"
            className="inline-flex items-center text-xs text-coffee-700 dark:text-coffee-300 hover:text-coffee-900 dark:hover:text-coffee-100 transition-colors px-2.5 py-1 rounded-md bg-coffee-100 dark:bg-white/5 border border-coffee-300 dark:border-white/10 hover:bg-coffee-200 dark:hover:bg-white/10"
          >
            Read more on my blog
            <i className="fas fa-arrow-right ml-1.5 text-[10px]"></i>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Home;
