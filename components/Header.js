import Link from "next/link";
import { useRouter } from "next/router";

const items = [
  { icon: "fab fa-twitter", link: "https://twitter.com/itsmrnatural" },
  {
    icon: "fab fa-discord",
    link: "https://discord.com/users/624572769484668938",
  },
  { icon: "fab fa-github", link: "https://github.com/itsmrnatural" },
];

const navItems = [
  { icon: "fal fa-home", active: "fa fa-home", label: "Home", href: "/" },
  {
    icon: "fal fa-folder",
    active: "fa fa-folder",
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
    icon: "fal fa-th-list",
    active: "fa fa-th-list",
    label: "Blog",
    href: "/blog",
  },
];

const Header = () => {
  const router = useRouter();
  const isActive = (href) => router.asPath === href;

  return (
    <nav className="w-full border-b-2 border-neutral-800/20 pb-2">
      <div className="flex flex-col md:flex-row w-full items-center md:justify-between">
        <p className="font-semibold text-xl">Mr. Natural</p>
        <div className="flex items-center space-x-2">
          {items.map(({ link, icon }) => (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:bg-neutral-700/20 rounded-xl transition-all duration-150 p-2 px-3"
            >
              <i className={`${icon} text-2xl hover:text-white`} />
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-center md:justify-start items-center space-x-4 py-2">
        {navItems.map(({ label, href, icon, active }) => (
          <Link key={label} href={href}>
            <a
              className={`flex items-center justify-center text-white/50 cursor-pointer hover:text-white/100 rounded-xl transition-all duration-150 ${
                isActive(href) && "text-white-100"
              }`}
            >
              <i className={`${isActive(href) ? active : icon} mr-2`} />
              {label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Header;
