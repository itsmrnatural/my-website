import Giscus from "@giscus/react";

/**
 * Comments component using Giscus
 * @returns {JSX.Element} The comments section
 */
export default function Comments() {
  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <i className="fas fa-comments text-emerald-400"></i>
        Comments
      </h2>
      <Giscus
        repo="itsmrnatural/my-website"
        repoId="R_kgDOH9ZYLA"
        category="General"
        categoryId="DIC_kwDOH9ZYLA4CUkVg"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
