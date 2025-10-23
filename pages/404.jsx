import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * 404 Not Found page component
 * @returns {JSX.Element} The 404 error page
 */
export default function NotFound() {
  return (
    <>
      <Head>
        <title>Mr. Natural • 404</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-coffee-50 dark:bg-neutral-900 py-20 px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-9xl font-heading font-bold text-coffee-800 dark:text-coffee-300 mb-6"
          >
            404
          </motion.div>

          {/* Coffee cup illustration */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
            className="text-8xl mb-6"
          >
            ☕
          </motion.div>

          {/* Error message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-heading font-bold text-coffee-900 dark:text-white mb-4"
          >
            Page Not Found
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-coffee-700 dark:text-gray-400 mb-8 max-w-md"
          >
            Looks like this page took a coffee break and never came back.
          </motion.p>

          {/* Back to home button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link href="/">
              <a className="inline-flex items-center gap-2 bg-coffee-700 hover:bg-coffee-800 dark:bg-coffee-600 dark:hover:bg-coffee-700 text-white py-3 px-8 rounded-lg font-semibold transition-all transform hover:scale-105">
                <i className="fas fa-home"></i>
                Back to Home
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
