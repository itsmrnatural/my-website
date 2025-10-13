import Link from "next/link";
import { useRouter } from "next/router";

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
  /**
   * Checks if the given href matches the current route
   * @param {string} href - The route to check
   * @returns {boolean} True if the route is active
   */
  const isActive = (href) => router.asPath === href;

  return (
    <header className="w-full border-b-2 border-neutral-800/20 pb-3 mb-6">
      {/* Name in Bold :D */}
      <div className="flex flex-col md:flex-row w-full items-center md:justify-between mb-2">
        <Link
          href="/"
          className="font-bold text-xl tracking-tight hover:text-neutral-300 transition-colors py-2"
        >
          Mr. Natural
        </Link>

        {/* Social Links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {socialLinks.map(({ link, icon, label }) => (
            <a
              key={link}
              href={link}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:bg-neutral-800/30 rounded-xl transition-all duration-200 p-2.5"
            >
              <i className={`${icon} text-xl text-neutral-400 hover:text-white`} />
            </a>
          ))}
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex justify-center md:justify-start items-center space-x-1 sm:space-x-1 pl-0 overflow-x-auto">
        {navItems.map(({ label, href, icon, active }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
              isActive(href)
                ? "bg-neutral-800/50 text-white font-medium"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
            }`}
          >
            <i className={`${isActive(href) ? active : icon} mr-2`} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation - 2x2 Grid */}
      <div className="md:hidden grid grid-cols-2 gap-1 w-full mt-2">
        {navItems.map(({ label, href, icon, active }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center justify-start px-4 py-3 text-sm rounded-lg transition-all duration-200 ${
              isActive(href)
                ? "bg-neutral-800/50 text-white font-medium"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/40"
            }`}
          >
            <i className={`${isActive(href) ? active : icon} mr-3 w-5 text-center`} />
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
