import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomCursor from "@components/CustomCursor";
import LanyardStatus from "@components/LanyardStatus";
import { useTheme } from "@contexts/ThemeContext";

/**
 * Home page component displaying personal introduction and information
 * @returns {JSX.Element} The Home page
 */
const Home = () => {
  const [gpgCopied, setGpgCopied] = useState(false);
  const [gpgKey, setGpgKey] = useState("");
  const { theme, mounted } = useTheme();

  // Fetch GPG key on mount
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/itsmrnatural/itsmrnatural/main/public-key.asc")
      .then((res) => res.text())
      .then((key) => setGpgKey(key))
      .catch((err) => console.error("Failed to fetch GPG key:", err));
  }, []);

  const copyGPGKey = () => {
    if (gpgKey) {
      navigator.clipboard.writeText(gpgKey);
      setGpgCopied(true);
      setTimeout(() => setGpgCopied(false), 2000);
    }
  };

  const downloadGPGKey = () => {
    const link = document.createElement("a");
    link.href = "/public-key.asc";
    link.download = "public-key.asc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const heatmapImageClass = mounted && theme === "dark" ? "invert-[0.88] hue-rotate-180 saturate-75 contrast-90" : "";

  return (
    <>
      <CustomCursor />
      <LanyardStatus />
      <Head>
        <title>Dhananjay • Home</title>
        <meta name="description" content="Student, programmer, and severe coffee addict." />
        <meta property="og:title" content="Dhananjay • Personal Website" />
        <meta
          property="og:description"
          content="Personal portfolio and blog of Dhananjay - Student, programmer, and severe coffee addict."
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
              Hey, I'm Dhananjay 👋
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
                    alt="Dhananjay's profile"
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
          <div className="absolute -top-5 -left-3 text-3xl text-coffee-500/70 dark:text-coffee-400/70">
            "
          </div>
          <div className="pl-4">
            Having spent the whole last year at home, I have come to realize that I may not be the
            introvert I thought I was. Though I might not speak much when I am with friends, I do
            genuinely enjoy their company and the humour they bring to my life.
            <footer className="text-right mt-3 text-xs text-coffee-600 dark:text-gray-400 pr-3">
              — Me, while alone and bored.
            </footer>
          </div>
          <div className="absolute bottom-0 right-2 text-3xl text-coffee-500/70 dark:text-coffee-400/70">
            "
          </div>
        </blockquote>
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
            You can import my GPG key to verify my commits and encrypt messages to me.
          </p>
          <div className="mb-3">
            <p className="text-xs text-coffee-600 dark:text-gray-400 mb-1 font-semibold">
              Key Fingerprint:
            </p>
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
                {gpgCopied ? "Copied!" : "Copy Key"}
              </motion.button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button
              onClick={downloadGPGKey}
              className="text-coffee-600 hover:text-coffee-800 dark:text-coffee-400 dark:hover:text-coffee-300 transition-colors cursor-pointer"
            >
              <i className="fas fa-download mr-1"></i>
              Download public key (.asc)
            </button>
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
        transition={{ delay: 0.85, duration: 0.5 }}
        className="mt-11 md:mt-14 bg-coffee-50 dark:bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 border border-coffee-200 dark:border-white/10"
      >
        <h2 className="text-xl font-subheading font-bold text-coffee-900 dark:text-white mb-2 flex items-center gap-2">
          <i className="fab fa-github text-coffee-600 dark:text-coffee-400"></i>
          GitHub Contributions
        </h2>
        <p className="text-sm text-coffee-600 dark:text-gray-400 mb-6">
          A quick look at my recent contribution activity
        </p>

        <div className="overflow-hidden rounded-xl border border-coffee-200 dark:border-white/10 bg-white/60 dark:bg-black/20 p-3 sm:p-4">
          <img
            src="https://ghchart.rshah.org/itsmrnatural"
            alt="GitHub contribution heatmap for itsmrnatural"
            className={`w-full h-auto ${heatmapImageClass}`}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-11 md:mt-14 pb-5 relative"
      >
        {/* <h2 className="text-lg font-subheading font-semibold text-coffee-900 dark:text-white mb-5 flex items-center">
          <i className="fas fa-compass text-coffee-600 dark:text-coffee-400 mr-2.5 text-sm"></i>
          What I'm up to lately
        </h2> */}

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
