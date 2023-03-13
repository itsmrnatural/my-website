import Head from "next/head";
import Image from "next/image";
import Tippy from "@tippyjs/react";

const Home = () => {
  return (
    <>
      <Head>
        <title>Mr. Natural • Home</title>
      </Head>
      <div className="bg-neutral-800/10 shadow-xl rounded-lg w-full h-auto mt-6">
        <div className="relative">
          <div className="flex flex-col lg:flex-row justify-between w-full p-6 px-8 items-center h-full">
            <div className="flex flex-col lg:justify-start justify-center items-center lg:items-start mt-5 lg:mt-0 w-full">
              <div className="flex items-center">
                <p className="flex items-center text-white text-4xl font-semibold">
                  Hey, I am Mr. Natural!👋
                </p>
              </div>
              <p className="text-white/50 text-md mt-3">
                I'm a student who loves to code and play games. I've been doing
                this for 3 years and have learned a lot. I enjoy exploring new
                technologies and playing the latest games. I also like watching
                movies and web series. Some of my favorites are Interstellar,
                Avengers: Infinity War, Spider-Man: No Way Home, The
                Mandalorian, The Last of Us, Andor, and The Inside Job. Thanks
                for stopping by!
              </p>
            </div>
            <div
              className={`order-first lg:order-last flex-shrink-0 relative w-[160px] h-[160px] squircle shadow-lg`}
            >
              <Tippy content="Mr. Natural#3549" placement="bottom" arrow={true}>
                <img
                  alt="itsmrnatural's avatar"
                  src={`https://i.imgur.com/isKXF9Q.gif`}
                  width="160"
                  height="160"
                  className={`bg-neutral-700 w-[160px] h-[160px] squircle`}
                />
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
