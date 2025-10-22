import { useState } from "react";
import Head from "next/head";

/**
 * About Me page component displaying personal information
 * @returns {JSX.Element} The About Me page
 */
export default function Home() {
  const [showMore, setShowMore] = useState(false);

  /**
   * Toggles the visibility of additional content
   */
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Head>
        <title>Mr. Natural • About Me</title>
      </Head>
      <div className="py-20 px-5">
        <p className="text-3xl font-heading font-bold text-coffee-900 dark:text-white">About Me</p>
        <p className="text-xl font-subheading text-coffee-700 dark:text-white/50 font-normal mb-5">
          Here's a little bit about me.
        </p>
        <div className="max-w-lg w-full mt-5">
          <p className="text-coffee-800 dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum quis nisi ac
            ullamcorper. Vestibulum commodo nisi vel nisl rhoncus, ut iaculis ex semper. Vivamus
            laoreet suscipit fermentum. Nullam sit amet turpis at tortor vulputate aliquam. Etiam
            volutpat vestibulum libero. Aliquam tristique velit id commodo blandit. Nunc id justo
            ligula. Proin sodales aliquam sem eget convallis. Praesent vel eleifend eros. Curabitur
            non nibh in magna finibus dignissim.
            {showMore && (
              <>
                <br />
                <br />
                <span>
                  I enjoy traveling and exploring new places, meeting new people, and trying new
                  cuisines. In my free time, I like to read books, watch movies, and play video
                  games. I also enjoy hiking and spending time in nature.
                </span>
              </>
            )}
          </p>
          <button
            className="text-coffee-700 dark:text-white underline mt-3"
            onClick={handleShowMore}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </>
  );
}
