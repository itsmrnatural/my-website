import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import hljs from "highlight.js/lib/common";

const extractCodeContent = (node) => {
  if (typeof node === "string") {
    return node;
  }
  if (Array.isArray(node)) {
    return node.map((n) => extractCodeContent(n)).join("");
  }
  if (node?.props?.children) {
    return extractCodeContent(node.props.children);
  }
  return "";
};

// Language display names mapping
const languageDisplayNames = {
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  python: "Python",
  py: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  cs: "C#",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  scala: "Scala",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sass: "Sass",
  less: "Less",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  xml: "XML",
  markdown: "Markdown",
  md: "Markdown",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  powershell: "PowerShell",
  sql: "SQL",
  graphql: "GraphQL",
  dockerfile: "Dockerfile",
  plaintext: "Plain Text",
  text: "Plain Text",
  jsx: "JSX",
  tsx: "TSX",
  vue: "Vue",
  svelte: "Svelte",
  r: "R",
  matlab: "MATLAB",
  lua: "Lua",
  perl: "Perl",
  haskell: "Haskell",
  elixir: "Elixir",
  erlang: "Erlang",
  clojure: "Clojure",
  fsharp: "F#",
  ocaml: "OCaml",
  dart: "Dart",
  nim: "Nim",
  zig: "Zig",
  makefile: "Makefile",
  cmake: "CMake",
  toml: "TOML",
  ini: "INI",
  nginx: "Nginx",
  apache: "Apache",
  diff: "Diff",
  http: "HTTP",
  regex: "Regex",
};

// Language icons (using Font Awesome where available)
const languageIcons = {
  javascript: "fab fa-js",
  js: "fab fa-js",
  typescript: "fab fa-js",
  ts: "fab fa-js",
  python: "fab fa-python",
  py: "fab fa-python",
  java: "fab fa-java",
  php: "fab fa-php",
  html: "fab fa-html5",
  css: "fab fa-css3-alt",
  sass: "fab fa-sass",
  scss: "fab fa-sass",
  rust: "fab fa-rust",
  go: "fab fa-golang",
  swift: "fab fa-swift",
  r: "fab fa-r-project",
  markdown: "fab fa-markdown",
  md: "fab fa-markdown",
  git: "fab fa-git-alt",
  dockerfile: "fab fa-docker",
  default: "fas fa-code",
};

/**
 * CodeBlock component with copy functionality, line numbers, and collapse feature
 * Wraps code blocks to add a copy button, line numbers, and collapse for long code
 */
export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const [hoveredLine, setHoveredLine] = useState(null);

  const { codeString, language } = useMemo(() => {
    const childArray = Array.isArray(children) ? children : [children];
    const codeElement = childArray.find((child) => child?.props?.children) || childArray[0];
    const rawCode = extractCodeContent(codeElement?.props?.children ?? codeElement) || "";
    const trimmedCode = rawCode.replace(/\n$/, "");
    const classNameValue = codeElement?.props?.className || "";
    const langMatch = classNameValue.match(/language-([\w-]+)/);
    return {
      codeString: trimmedCode,
      language: langMatch ? langMatch[1] : "plaintext",
    };
  }, [children]);

  const highlightedLines = useMemo(() => {
    if (!codeString) return [""];

    try {
      const result =
        language && hljs.getLanguage(language)
          ? hljs.highlight(codeString, { language, ignoreIllegals: true })
          : hljs.highlightAuto(codeString);

      return result.value.split("\n");
    } catch (error) {
      console.warn("Syntax highlighting failed:", error);
      const escapeHtml = (str) =>
        str
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");
      return escapeHtml(codeString).split("\n");
    }
  }, [codeString, language]);

  useEffect(() => {
    const lines = highlightedLines;
    setLineCount(lines.length);
    if (lines.length > 15) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [highlightedLines]);

  const copyCode = () => {
    if (codeString) {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const showCollapseButton = lineCount > 15;
  const visibleLines =
    isCollapsed && showCollapseButton ? highlightedLines.slice(0, 8) : highlightedLines;

  const displayLanguage = languageDisplayNames[language.toLowerCase()] || language.toUpperCase();
  const languageIcon = languageIcons[language.toLowerCase()] || languageIcons.default;
  const lineNumberWidth = Math.max(2, String(lineCount).length);

  return (
    <div className="relative group my-6">
      <div className="code-block relative rounded-lg overflow-hidden bg-[#282c34] dark:bg-[#1a1b26] border border-coffee-300/20 dark:border-white/10 shadow-md">
        {/* Header bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#21252b] dark:bg-[#16161e] border-b border-white/10">
          <div className="flex items-center gap-2">
            {/* Language label */}
            <div className="flex items-center gap-2 text-xs font-medium text-white/50">
              <i className={`${languageIcon} text-white/40`}></i>
              <span>{displayLanguage}</span>
            </div>
          </div>
          
          {/* Copy button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyCode}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
              copied 
                ? "bg-green-500/20 text-green-400" 
                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
            }`}
            aria-label="Copy code"
          >
            <i className={`fas ${copied ? "fa-check" : "fa-clipboard"} text-[10px]`}></i>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </motion.button>
        </div>

        {/* Code content */}
        <div
          className={`transition-all duration-300 overflow-x-auto ${
            isCollapsed && showCollapseButton ? "max-h-[14rem] overflow-hidden" : ""
          }`}
        >
          <pre
            className={`m-0 py-2.5 text-[0.8125rem] leading-[1.5] ${className || ""}`}
            {...props}
          >
            <code className="hljs block">
              {visibleLines.map((line, idx) => (
                <div 
                  className={`code-line flex transition-colors duration-150 ${
                    hoveredLine === idx ? "bg-white/[0.03]" : ""
                  }`} 
                  key={idx}
                  onMouseEnter={() => setHoveredLine(idx)}
                  onMouseLeave={() => setHoveredLine(null)}
                >
                  <span 
                    className="line-number select-none shrink-0 pr-3 text-right text-white/25 text-[0.75rem]" 
                    aria-hidden="true"
                    style={{ 
                      width: `${lineNumberWidth + 1.5}ch`,
                      paddingLeft: '0.75rem',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="line-content flex-1 pr-3"
                    style={{ minHeight: '1.5em' }}
                    dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>
        
        {/* Fade gradient for collapsed state */}
        {isCollapsed && showCollapseButton && (
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, transparent, #282c34)",
            }}
          />
        )}
      </div>

      {/* Expand/Collapse button */}
      {showCollapseButton && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-2 mt-0 bg-[#21252b] dark:bg-[#16161e] hover:bg-[#282c34] dark:hover:bg-[#1a1b26] text-white/50 hover:text-white/70 text-xs font-medium rounded-b-lg border border-t-0 border-coffee-300/20 dark:border-white/10 transition-all flex items-center justify-center gap-2"
        >
          <i className={`fas ${isCollapsed ? "fa-chevron-down" : "fa-chevron-up"} text-[10px]`}></i>
          {isCollapsed ? `Show all ${lineCount} lines` : "Collapse"}
        </motion.button>
      )}
    </div>
  );
}
