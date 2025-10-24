import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Custom Error page component for all server-side errors
 * @param {Object} props - Component props
 * @param {number} props.statusCode - HTTP status code
 * @returns {JSX.Element} The error page
 */
function Error({ statusCode }) {
  const is500 = statusCode === 500 || statusCode >= 500;
  const is404 = statusCode === 404;

  return (
    <>
      <Head>
        <title>Mr. Natural • {statusCode || "Error"}</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-coffee-50 dark:bg-black py-20 px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Large error code */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-9xl font-heading font-bold text-coffee-800 dark:text-coffee-300 mb-6"
          >
            {statusCode || 500}
          </motion.div>

          {/* Error emoji illustration */}
          <motion.div
            initial={{ opacity: 0, rotate: is500 ? 10 : -10, y: -50 }}
            animate={{
              opacity: 1,
              rotate: [0, is500 ? 5 : -5, 0, is500 ? -5 : 5, 0],
              y: [0, -10, 0, -5, 0],
            }}
            transition={{
              delay: 0.4,
              rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            }}
            className="text-8xl mb-6 relative"
            style={{
              filter:
                "drop-shadow(0 0 20px rgba(255, 200, 100, 0.6)) drop-shadow(0 0 40px rgba(255, 150, 50, 0.4))",
            }}
          >
            <span className="dark:drop-shadow-[0_0_30px_rgba(255,200,100,0.8)] dark:drop-shadow-[0_0_60px_rgba(255,150,50,0.6)]">
              {is500 ? "💥" : "☕"}
            </span>
          </motion.div>

          {/* Error message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-heading font-bold text-coffee-900 dark:text-white mb-4"
          >
            {is500 ? "Internal Server Error" : is404 ? "Page Not Found" : "An Error Occurred"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-coffee-700 dark:text-gray-400 mb-8 max-w-md"
          >
            {is500
              ? "Oops! Looks like the server spilled its coffee."
              : is404
              ? "Looks like this page took a coffee break and never came back."
              : "Something unexpected happened. Please try again."}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <a className="inline-flex items-center gap-2 bg-coffee-700 hover:bg-coffee-800 dark:bg-coffee-600 dark:hover:bg-coffee-700 text-white py-3 px-8 rounded-lg font-semibold transition-all transform hover:scale-105">
                <i className="fas fa-home"></i>
                Back to Home
              </a>
            </Link>
            {is500 && (
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-coffee-200 hover:bg-coffee-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-coffee-900 dark:text-white py-3 px-8 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <i className="fas fa-redo"></i>
                Try Again
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
