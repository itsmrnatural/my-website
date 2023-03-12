import Head from "next/head";
import Image from "next/image";
import swr from "../public/js/swr";

export default function Home() {
  const { data: _repositories } = swr("/api/repos");
  const repositories = _repositories ? _repositories : null;
  return (
    <>
      <Head>
        <title>Mr. Natural • Projects</title>
      </Head>
      <div className="py-20">
        <p className="text-3xl text-white font-semibold">My Projects</p>
        <p className="text-xl text-white/50 font-normal mb-5">
          This page is currently in works but you can see the outline of how projects would look like. :D
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 items-center mt-2">
          {repositories &&
            repositories
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
              .map((repo, index) => (
                <a
                  key={index}
                  href={`https://github.com/itsmrnatural/${repo.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#191932]/20 p-4 hover:bg-[#191932]/30 shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg w-full"
                >
                  <p className="text-md text-white">
                    <span className="text-sm text-white/50 bg-black/25 px-2 py-1 rounded-md mr-1">
                      {repo.owner.login}
                    </span>
                    {repo.name}
                  </p>
                  <div className="mt-5 flex justify-end w-full h-full items-center">
                    <div className="flex w-full justify-between items-center">
                      <Tippy
                        content={"Stars"}
                        arrow={false}
                        animation="shift-away"
                      >
                        <div className="flex items-center">
                          <p className="text-sm">
                            <i className="fal fa-star mr-2" />
                          </p>
                          <p>{repo.stargazers_count}</p>
                        </div>
                      </Tippy>
                      <div className="text-sm text-white bg-black/25 px-2 py-1 rounded-md mr-1">
                        {repo.language || "Empty"}
                      </div>
                      <Tippy
                        content={"Forks"}
                        arrow={false}
                        animation="shift-away"
                      >
                        <div className="flex items-center justify-end">
                          <p>{repo.forks}</p>
                          <p className="text-sm">
                            <i className="fal fa-code-branch ml-2" />
                          </p>
                        </div>
                      </Tippy>
                    </div>
                  </div>
                </a>
              ))}
          {!repositories &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#191932]/20 p-4 rounded-lg w-full"
              >
                <div className="bg-[#191932]/50 animate-pulse w-full h-[28px] rounded-md" />
                <div className="mt-5 flex w-full justify-between items-center">
                  <div className="bg-[#191932]/50 animate-pulse w-12 h-[24px] rounded-md" />
                  <div className="bg-[#191932]/50 animate-pulse w-24 h-[24px] rounded-md" />
                  <div className="bg-[#191932]/50 animate-pulse w-12 h-[24px] rounded-md" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
