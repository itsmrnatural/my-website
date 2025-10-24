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

/**
 * CodeBlock component with copy functionality, line numbers, and collapse feature
 * Wraps code blocks to add a copy button, line numbers, and collapse for long code
 */
export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [lineCount, setLineCount] = useState(0);

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
      // Try to get language, fallback to auto-detection
      const result = language && hljs.getLanguage(language)
        ? hljs.highlight(codeString, { language, ignoreIllegals: true })
        : hljs.highlightAuto(codeString);
      
      return result.value.split("\n");
    } catch (error) {
      // Fallback to escaped plain text
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

  // Count lines and decide collapse state
  useEffect(() => {
    const lines = highlightedLines;
    setLineCount(lines.length);
    if (lines.length > 12) {
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

  const showCollapseButton = lineCount > 12;
  const visibleLines = isCollapsed && showCollapseButton ? highlightedLines.slice(0, 7) : highlightedLines;
  const displayLineOffset = 0; // Start from line 1 always

  return (
    <div className="relative group my-4">
      <div
        className={`code-block relative rounded-xl overflow-hidden bg-[rgba(40,44,52,0.9)] dark:bg-[rgba(20,22,26,0.75)] backdrop-blur-lg border border-coffee-500/20 dark:border-coffee-400/15 shadow-lg`}
      >
        <div
          className={`transition-all duration-300 overflow-x-auto ${
            isCollapsed && showCollapseButton ? "max-h-[11.5rem] overflow-hidden" : ""
          }`}
        >
          <pre className={`m-0 px-3 py-2.5 text-[0.813rem] leading-5 ${className || ""}`} {...props}>
            <code className="hljs">
              {visibleLines.map((line, idx) => (
                <span className="code-line" key={displayLineOffset + idx}>
                  <span className="line-number" aria-hidden="true">
                    {displayLineOffset + idx + 1}
                  </span>
                  <span
                    className="line-content"
                    dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                  />
                </span>
              ))}
            </code>
          </pre>
        </div>
        {isCollapsed && showCollapseButton && (
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to bottom, rgba(40,44,52,0), rgba(40,44,52,0.95))",
            }}
          />
        )}
      </div>

      {/* Expand/Collapse button */}
      {showCollapseButton && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full py-2 bg-coffee-700/80 hover:bg-coffee-700 dark:bg-coffee-900/80 dark:hover:bg-coffee-800 text-white text-xs rounded-b transition-all flex items-center justify-center gap-2"
        >
          <i className={`fas ${isCollapsed ? "fa-chevron-down" : "fa-chevron-up"} text-xs`}></i>
          {isCollapsed ? `Show all ${lineCount} lines` : "Show less"}
        </motion.button>
      )}

      {/* Copy button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyCode}
        className="absolute top-2 right-2 px-3 py-1.5 bg-coffee-600/90 hover:bg-coffee-700 dark:bg-coffee-800/90 dark:hover:bg-coffee-700 text-white text-xs rounded transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 backdrop-blur-sm z-20"
        aria-label="Copy code"
      >
        <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-xs`}></i>
        {copied ? "Copied!" : "Copy"}
      </motion.button>
    </div>
  );
}
