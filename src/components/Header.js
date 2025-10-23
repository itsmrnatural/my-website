import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

/**
 * Social media links configuration
 */
const socialLinks = [
  { icon: "fab fa-twitter", link: "https://twitter.com/itsmrnatural" },
  {
    icon: "fab fa-discord",
    link: "https://discord.com/users/624572769484668938",
  },
  { icon: "fab fa-github", link: "https://github.com/itsmrnatural" },
  { icon: "fab fa-lastfm", link: "https://last.fm/user/itsmrnatural" },
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <header className={`sticky top-0 z-50 w-full backdrop-blur-xl transition-all duration-500 ${
      scrolled 
        ? "bg-gradient-to-b from-coffee-50/98 via-coffee-50/95 to-coffee-50/90 dark:from-black/98 dark:via-black/95 dark:to-black/90 shadow-lg shadow-coffee-300/20 dark:shadow-black/40 py-3" 
        : "bg-gradient-to-b from-coffee-50/80 via-coffee-50/70 to-coffee-50/60 dark:from-black/80 dark:via-black/70 dark:to-black/60 shadow-md shadow-coffee-300/10 dark:shadow-black/20 py-4"
    }`}>
      <div className={`max-w-screen-lg px-5 w-full md:w-10/12 lg:w-8/12 mx-auto transition-all duration-500 ${
        scrolled ? "scale-[0.98]" : "scale-100"
      }`}>
        {/* Name and Theme Toggle Row */}
        <div className="flex w-full items-center justify-between mb-4">
          <Link
            href="/"
            className="font-bold font-heading text-xl tracking-tight text-coffee-900 dark:text-white hover:text-coffee-700 dark:hover:text-neutral-300 transition-colors"
          >
            Mr. Natural
          </Link>
          
          <ThemeToggle />
        </div>

        {/* Navigation and Social Links Row */}
        <div className="flex flex-col md:flex-row w-full items-center md:justify-between gap-3">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ label, href, icon, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-all duration-200 border ${
                  isActive(href)
                    ? "bg-coffee-300 dark:bg-neutral-800/50 text-coffee-900 dark:text-white font-medium shadow-sm border-coffee-400 dark:border-neutral-700"
                    : "text-coffee-700 dark:text-neutral-400 hover:text-coffee-900 dark:hover:text-white hover:bg-coffee-200 dark:hover:bg-neutral-800/40 border-coffee-200 dark:border-neutral-800/50 hover:border-coffee-300 dark:hover:border-neutral-700"
                }`}
              >
                <i className={`${isActive(href) ? active : icon} mr-2`} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-1">
            {socialLinks.map(({ link, icon, label }) => (
              <a
                key={link}
                href={link}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:bg-coffee-200 dark:hover:bg-neutral-800/30 rounded-xl transition-all duration-200 p-2.5"
              >
                <i
                  className={`${icon} text-xl text-coffee-600 dark:text-neutral-400 hover:text-coffee-800 dark:hover:text-white`}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation - 2x2 Grid */}
        <div className="md:hidden grid grid-cols-2 gap-2 w-full mt-3">
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
