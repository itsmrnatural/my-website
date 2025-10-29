import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

/**
 * Social media links configuration
 */
const socialLinks = [
  { icon: "fab fa-linkedin", link: "https://linkedin.com/in/imdhananjay", label: "LinkedIn" },
  { icon: "fab fa-github", link: "https://github.com/itsmrnatural", label: "Github" },
  {
    icon: "fab fa-discord",
    link: "https://discord.com/users/624572769484668938",
    label: "Discord",
  },
  { icon: "fab fa-lastfm", link: "https://last.fm/user/itsmrnatural", label: "Last.fm" },
];

/**
 * Navigation menu items configuration
 */
const navItems = [
  { icon: "fal fa-home", active: "fa fa-home", label: "Home", href: "/" },
  {
    icon: "fal fa-project-diagram",
    active: "fa fa-project-diagram",
    label: "Projects",
    href: "/projects",
  },
  {
    icon: "fal fa-user",
    active: "fa fa-user",
    label: "About Me",
    href: "/aboutme",
  },
  {
    icon: "fal fa-chalkboard",
    active: "fa fa-chalkboard",
    label: "Blog",
    href: "/blog",
  },
];

/**
 * Header component with navigation and social links
 * @returns {JSX.Element} The header with navigation menu
 */
const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      setCollapsed(scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Checks if the given href matches the current route
   * @param {string} href - The route to check
   * @returns {boolean} True if the route is active
   */
  const isActive = (href) => router.asPath === href;

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-coffee-50/98 via-coffee-50/95 to-coffee-50/90 dark:from-black/98 dark:via-black/95 dark:to-black/90 shadow-lg shadow-coffee-300/20 dark:shadow-black/40 py-2"
          : "bg-gradient-to-b from-coffee-50/80 via-coffee-50/70 to-coffee-50/60 dark:from-black/80 dark:via-black/70 dark:to-black/60 shadow-md shadow-coffee-300/10 dark:shadow-black/20 py-4"
      }`}
    >
      <div
        className={`max-w-screen-lg px-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-500 ${
          collapsed ? "scale-[0.95]" : scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        {/* Name and Theme Toggle Row - Hidden when collapsed */}
        <div
          className={`flex w-full items-center justify-between overflow-hidden transition-all duration-500 ${
            collapsed ? "max-h-0 opacity-0 mb-0" : "max-h-20 opacity-100 mb-4"
          }`}
        >
          <Link
            href="/"
            className="font-bold font-heading text-xl tracking-tight text-coffee-900 dark:text-white hover:text-coffee-700 dark:hover:text-neutral-300 transition-colors"
          >
            Natural
          </Link>

          <ThemeToggle />
        </div>

        {/* Navigation and Social Links Row */}
        <div
          className={`flex flex-col md:flex-row w-full items-center md:justify-between transition-all duration-500 ${
            collapsed ? "gap-2" : "gap-3"
          }`}
        >
          {/* Desktop Navigation Links - Compact when collapsed */}
          <nav
            className={`hidden md:flex items-center transition-all duration-500 ${
              collapsed ? "space-x-1" : "space-x-1"
            }`}
          >
            {navItems.map(({ label, href, icon, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-center transition-all duration-500 text-sm rounded-lg border ${
                  collapsed ? "w-10 h-10 p-0" : "px-3 py-2"
                } ${
                  isActive(href)
                    ? "bg-coffee-300 dark:bg-neutral-800/50 text-coffee-900 dark:text-white font-medium shadow-sm border-coffee-400 dark:border-neutral-700"
                    : "text-coffee-700 dark:text-neutral-400 hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-200 dark:hover:bg-neutral-800/40 border-coffee-200 dark:border-neutral-800/50 hover:border-coffee-300 dark:hover:border-neutral-700"
                }`}
              >
                <i
                  className={`${isActive(href) ? active : icon} text-base ${
                    collapsed ? "" : "mr-2"
                  }`}
                />
                <span
                  className={`overflow-hidden transition-all duration-500 ${
                    collapsed ? "max-w-0 opacity-0" : "max-w-[100px] opacity-100"
                  }`}
                >
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Social Links - Compact when collapsed, hidden on mobile when collapsed */}
          <div
            className={`items-center transition-all duration-500 ${
              collapsed ? "hidden md:flex space-x-1" : "flex space-x-1"
            }`}
          >
            {socialLinks.map(({ link, icon, label }) => (
              <Tippy key={link} content={label} placement="bottom">
                <a
                  href={link}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center hover:bg-coffee-200 dark:hover:bg-neutral-800/30 rounded-xl transition-all duration-500 ${
                    collapsed ? "w-10 h-10 p-0" : "p-2.5"
                  }`}
                >
                  <i
                    className={`${icon} text-coffee-600 dark:text-neutral-400 hover:text-coffee-800 dark:hover:text-white transition-all duration-500 ${
                      collapsed ? "text-base" : "text-xl"
                    }`}
                  />
                </a>
              </Tippy>
            ))}
          </div>
        </div>

        {/* Mobile Navigation - Shown when collapsed, hidden when expanded */}
        <div
          className={`md:hidden w-full overflow-hidden transition-all duration-500 ${
            collapsed ? "max-h-[60px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {navItems.map(({ label, href, icon, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-center w-12 h-12 text-sm rounded-lg transition-all duration-200 border ${
                  isActive(href)
                    ? "bg-coffee-300 dark:bg-neutral-800/50 text-coffee-900 dark:text-white font-medium shadow-sm border-coffee-400 dark:border-neutral-700"
                    : "text-coffee-700 dark:text-neutral-400 hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-200 dark:hover:bg-neutral-800/40 border-coffee-200 dark:border-neutral-800/50 hover:border-coffee-300 dark:hover:border-neutral-700"
                }`}
              >
                <i className={`${isActive(href) ? active : icon} text-base`} />
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Grid - Shown when NOT collapsed */}
        <div
          className={`md:hidden grid grid-cols-2 gap-2 w-full overflow-hidden transition-all duration-500 ${
            collapsed ? "max-h-0 opacity-0 mt-0" : "max-h-[200px] opacity-100 mt-3"
          }`}
        >
          {navItems.map(({ label, href, icon, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center justify-start px-4 py-3 text-sm rounded-lg transition-all duration-200 border ${
                isActive(href)
                  ? "bg-coffee-300 dark:bg-neutral-800/50 text-coffee-900 dark:text-white font-medium shadow-sm border-coffee-400 dark:border-neutral-700"
                  : "text-coffee-700 dark:text-neutral-400 hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-200 dark:hover:bg-neutral-800/40 border-coffee-200 dark:border-neutral-800/50 hover:border-coffee-300 dark:hover:border-neutral-700"
              }`}
            >
              <i className={`${isActive(href) ? active : icon} mr-3 w-5 text-center`} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
