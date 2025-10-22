import "../public/styles/globals.css";
import "../public/styles/tooltip.css";
import Head from "next/head";
import dynamic from "next/dynamic";
import "tippy.js/animations/scale-subtle.css";
import "tippy.js/animations/scale-extreme.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import Router, { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { ThemeProvider } from "../contexts/ThemeContext";

const Header = dynamic(() => import("../components/Header"));
const Footer = dynamic(() => import("../components/Footer"));

/**
 * Preloads page components for smoother page transitions
 */
const preloadPages = () => {
  const importPage = (path) => {
    switch (path) {
      case "/":
        import("../pages/index");
        break;
      case "/aboutme":
        import("../pages/aboutme");
        break;
      case "/blog":
        import("../pages/blog");
        break;
      case "/projects":
        import("../pages/projects");
        break;
      default:
        break;
    }
  };

  const navItems = ["/", "/aboutme", "/blog", "/projects"];
  navItems.forEach((item) => importPage(item));
};

/**
 * Main App component for Next.js application
 * Handles routing, loading states, and global layout
 * @param {Object} props - Component props
 * @param {React.ComponentType} props.Component - The active page component
 * @param {Object} props.pageProps - Props for the active page
 * @returns {JSX.Element} The application wrapper
 */
function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Intial page load
    const intialLoadTimer = setTimeout(() => {
      setIsLoading(false);
      document.documentElement.style = "pointer-events: all;";
    }, 300);

    // Route change start
    const handleStart = () => {
      setIsLoading(true);
      document.documentElement.style = "pointer-events: none;";
    };

    // Route change complete
    const handleComplete = () => {
      const completeTimer = setTimeout(() => {
        setIsLoading(false);
        document.documentElement.style = "pointer-events: all;";
      }, 150);

      return () => clearTimeout(completeTimer);
    };

    // Route change error
    const handleError = () => {
      setIsLoading(false);
      document.documentElement.style = "pointer-events: all;";
    };

    // Add event listeners
    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleError);

    // Clean up event listeners on unmount
    return () => {
      clearTimeout(intialLoadTimer);
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleError);
    };
  }, []);

  // Prefetching pages
  useEffect(() => {
    const prefetchPages = () => {
      router.prefetch("/");
      router.prefetch("/aboutme");
      router.prefetch("/projects");
      router.prefetch("/blog");
    };
    prefetchPages();
  }, [router]);

  return (
    <ThemeProvider>
      <Head>
        <title>Mr. Natural • Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Transition
        as={Fragment}
        show={isLoading}
        enter="transform duration-[50ms] transition"
        enterFrom="opacity-0"
        enterTo="opacity-80"
        leave="transform duration-[100ms] transition ease-in-out"
        leaveFrom="opacity-80"
        leaveTo="opacity-0"
      >
        <div
          style={{ zIndex: 99999 }}
          className="fixed bg-black/75 dark:bg-black/75 w-full h-screen flex justify-center items-center pointer-events-none"
        >
          <div className="flex items-center gap-x-6 animate-pulse">
            <div className="text-center">
              <p className="text-6xl mb-5 font-semibold text-coffee-900 dark:text-white">
                Loading...
              </p>
              <p className="uppercase text-xl font-semibold text-coffee-800 dark:text-white">
                <i className="fal fa-spinner-third fa-spin" />
              </p>
            </div>
          </div>
        </div>
      </Transition>
      <main className="border-b-[7px] border-t-[7px] h-full border-coffee-300 dark:border-neutral-800/50 w-full">
        <div className="min-h-screen max-w-screen-lg p-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
          <Header />
          <Component {...pageProps} />
        </div>
        <div className=" p-4 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-300">
          <div className="bg-coffee-100 dark:bg-neutral-800/5">
            <div className="flex flex-row mx-20">
              <Footer />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
export default MyApp;
