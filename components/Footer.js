import React from "react";
import Link from "next/link";

const Footer = () => (
    <div className="bg-neutral-800/5 py-4">
        <div className="flex items-center justify-center">
            <div className="flex flex-col md:flex-row md:space-x-5">
                <div className="mt-2 text-center md:text-left">
                    Made with ❤️| © {new Date().getFullYear()} All rights
                    reserved.
                </div>
                <div className="flex flex-col md:flex-row md:space-x-5 mt-2">
                    <Link
                        href="https://github.com/itsmrnatural/my-website"
                        className="hover:text-white"
                    >
                        Source Code
                    </Link>
                    <Link
                        href="https://dsc.gg/pypke"
                        className="hover:text-white"
                    >
                        Pypke Bot
                    </Link>
                    <Link
                        href="https://dsc.gg/mrnatural"
                        className="hover:text-white"
                    >
                        Join my server
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;
