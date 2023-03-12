import React from "react";

const Footer = () => (
  <div className="bg-neutral-800/5 py-4">
    <div className="flex justify-center">
      <div className="flex flex-col items-center md:flex-row md:space-x-40">
        <div className="mt-2">
          Made with ❤️| © {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex flex-col items-center md:flex-row md:space-x-5">
          <div className="mt-2">
            <a
              href="https://github.com/itsmrnatural/my-website"
              className="hover:text-white"
            >
              Source Code
            </a>
          </div>
          <div className="mt-2">
            <a href="https://dsc.gg/pypke" className="hover:text-white">
              Pypke Bot
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
