import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-800/10 py-6 px-3">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - Copyright */}
          <div className="text-neutral-400 text-sm text-center md:text-left">
            {/* Desktop version (side by side) */}
            <div className="hidden md:flex md:items-center">
              <span className="font-medium">Mr. Natural</span>
              <span>&nbsp;&copy; {currentYear}</span>
              <span className="mx-2 text-neutral-600">|</span>
              <span>Design rights reserved</span>
            </div>

            {/* Mobile version (stacked) */}
            <div className="md:hidden">
              <div className="font-medium">Mr. Natural &copy; {currentYear}</div>
              <div>Design rights reserved</div>
            </div>
          </div>

          {/* Right side - Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-y-0 gap-x-3 md:gap-6">
            <Link
              href="https://github.com/itsmrnatural/my-website"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github text-lg" />
              <span>Source</span>
            </Link>
            <Link
              href="https://linkedin.com/in/imdhananjay"
              className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-lg" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* <div className="mt-4 text-center text-xs text-neutral-500">
          Made with <span className="text-red-500">❤️</span>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
