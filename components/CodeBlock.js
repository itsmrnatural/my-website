import { useState, useEffect } from "react";

/**
 * CodeBlock component with copy functionality
 * Enhances code blocks with a copy button
 */
export default function CodeBlock() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add copy buttons to all code blocks
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (!pre || pre.querySelector(".copy-button")) return;

      // Create wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper relative group";

      // Create copy button
      const button = document.createElement("button");
      button.className =
        "copy-button absolute top-2 right-2 px-3 py-1.5 bg-emerald-500/80 hover:bg-emerald-600 text-white text-xs rounded-md transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2";
      button.innerHTML = '<i class="fas fa-copy"></i> Copy';

      // Wrap the pre element
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(button);

      // Add click handler
      button.addEventListener("click", async () => {
        const code = codeBlock.textContent;
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = '<i class="fas fa-check"></i> Copied!';
          button.classList.add("bg-emerald-600");
          setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            button.classList.remove("bg-emerald-600");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });
    });

    return () => {
      // Cleanup if needed
    };
  }, [mounted]);

  return null;
}
