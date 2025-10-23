import { useState } from "react";
import { motion } from "framer-motion";

/**
 * CodeBlock component with copy functionality
 * Wraps code blocks to add a copy button
 */
export default function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);

  // Extract the code content from children - recursively handle nested elements
  const getCodeContent = (node) => {
    if (typeof node === "string") {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((n) => getCodeContent(n)).join("");
    }
    if (node?.props?.children) {
      return getCodeContent(node.props.children);
    }
    return "";
  };

  const copyCode = () => {
    const code = getCodeContent(children);
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group my-4">
      <pre className={className} {...props}>
        {children}
      </pre>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyCode}
        className="absolute top-2 right-2 px-3 py-1.5 bg-coffee-600/90 hover:bg-coffee-700 dark:bg-coffee-800/90 dark:hover:bg-coffee-700 text-white text-xs rounded transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 backdrop-blur-sm"
        aria-label="Copy code"
      >
        <i className={`fas ${copied ? "fa-check" : "fa-copy"} text-xs`}></i>
        {copied ? "Copied!" : "Copy"}
      </motion.button>
    </div>
  );
}
