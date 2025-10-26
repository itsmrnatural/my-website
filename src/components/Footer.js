import React from "react";
import Link from "next/link";

/**
 * Footer component with copyright information and external links
 * @returns {JSX.Element} The footer section
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-coffee-300 dark:border-white/10 bg-coffee-50/50 dark:bg-transparent backdrop-blur-sm py-8 px-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Copyright */}
          <div className="text-coffee-700 dark:text-gray-300 text-sm text-center md:text-left">
            <div className="flex items-center flex-wrap justify-center md:justify-start gap-2">
              <span className="font-semibold font-heading">Dhananjay Rajput</span>
              <span className="text-coffee-500 dark:text-gray-500">|</span>
              <span>&copy; {currentYear}</span>
              <span className="text-coffee-600 dark:text-gray-400">All rights reserved</span>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/itsmrnatural/my-website"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-coffee-100 dark:bg-white/5 hover:bg-coffee-200 dark:hover:bg-white/10 border border-coffee-200 dark:border-white/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
            >
              <i className="fab fa-github text-lg text-coffee-700 dark:text-gray-300 group-hover:text-coffee-900 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-coffee-700 dark:text-gray-300 group-hover:text-coffee-900 dark:group-hover:text-white transition-colors">
                Source
              </span>
            </a>
            <a
              href="https://linkedin.com/in/imdhananjay"
              className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-coffee-100 dark:bg-white/5 hover:bg-coffee-200 dark:hover:bg-white/10 border border-coffee-200 dark:border-white/10 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
            >
              <i className="fab fa-linkedin text-lg text-coffee-700 dark:text-gray-300 group-hover:text-coffee-900 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-coffee-700 dark:text-gray-300 group-hover:text-coffee-900 dark:group-hover:text-white transition-colors">
                LinkedIn
              </span>
            </a>
          </div>
        </div>

        {/* Made with love message */}
        <div className="mt-6 text-center text-xs text-coffee-500 dark:text-gray-500">
          Made with <span className="animate-pulse text-coffee-600/90 to-coffee-800/90">❤️</span>{" "}
          and ☕
        </div>
      </div>
    </footer>
  );
};

export default Footer;
