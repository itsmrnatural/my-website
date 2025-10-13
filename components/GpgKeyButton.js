import { useState } from "react";
import { motion } from "framer-motion";

/**
 * GPG Key Copy Button Component
 * Displays GPG key information with a copy-to-clipboard button
 */
export default function GpgKeyButton() {
  const [copied, setCopied] = useState(false);

  const gpgFingerprint = "92EA 052E 2457 66B4 D849  4D5B 3D28 0550 B702 CBB9";
  const gpgKeyId = "3D280550B702CBB9";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gpgFingerprint);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-shield-alt text-emerald-400"></i>
            <h3 className="text-sm font-semibold text-white">GPG Public Key</h3>
          </div>
          <p className="text-xs text-gray-300 font-mono break-all mb-1">{gpgFingerprint}</p>
          <p className="text-xs text-gray-400">
            Key ID: <span className="text-emerald-300 font-mono">{gpgKeyId}</span>
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md transition-all text-xs font-medium flex items-center gap-2"
        >
          <i className={`fas ${copied ? "fa-check" : "fa-copy"}`}></i>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mt-3 pt-3 border-t border-white/10">
        <a
          href="https://keys.openpgp.org/search?q=92EA052E245766B4D8494D5B3D280550B702CBB9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
        >
          View on keyserver
          <i className="fas fa-external-link-alt text-[9px]"></i>
        </a>
      </div>
    </motion.div>
  );
}
