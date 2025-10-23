import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * Lanyard Discord status component
 * Displays real-time Discord presence using Lanyard API
 * @returns {JSX.Element} Lanyard status widget
 */
export default function LanyardStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data directly from Lanyard API
    fetch("https://api.lanyard.rest/v1/users/624572769484668938")
      .then((res) => res.json())
      .then((data) => {
        console.log("Lanyard response:", data);
        if (data.success) {
          setStatus(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lanyard error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !status) {
    return null; // Hide while loading
  }

  const statusColors = {
    online: "#22c55e",
    idle: "#eab308",
    dnd: "#ef4444",
    offline: "#6b7280",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
        title="Discord Status"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-coffee-800 shadow-lg">
          <img
            src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png?size=128`}
            alt="Discord"
            className="w-full h-full"
          />
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-coffee-900"
          style={{ backgroundColor: statusColors[status.discord_status] }}
        ></div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="absolute bottom-16 right-0 w-72 bg-white dark:bg-coffee-900 rounded-xl shadow-2xl border border-coffee-200 dark:border-coffee-700 p-4 space-y-3"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-coffee-200 dark:border-coffee-700">
            <img
              src={`https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png?size=128`}
              alt="Discord Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-coffee-900 dark:text-white">
                {status.discord_user.username}
              </p>
              <p className="text-sm text-coffee-600 dark:text-coffee-400 capitalize">
                {status.discord_status}
              </p>
            </div>
          </div>

          {status.spotify && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-green-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-xs font-medium">Listening to Spotify</span>
              </div>
              <div className="flex gap-3">
                <img
                  src={status.spotify.album_art_url}
                  alt={status.spotify.album}
                  className="w-12 h-12 rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coffee-900 dark:text-white truncate">
                    {status.spotify.song}
                  </p>
                  <p className="text-xs text-coffee-600 dark:text-coffee-400 truncate">
                    {status.spotify.artist}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Custom Status (type 4) */}
          {status.activities?.find((a) => a.type === 4) && (
            <div className="flex items-center gap-2 text-sm text-coffee-700 dark:text-coffee-300 bg-coffee-50 dark:bg-coffee-800 rounded-lg p-2">
              {status.activities.find((a) => a.type === 4).emoji && (
                <span className="text-lg">
                  {status.activities.find((a) => a.type === 4).emoji.name}
                </span>
              )}
              <span className="truncate">{status.activities.find((a) => a.type === 4).state}</span>
            </div>
          )}

          {/* Gaming Activity (type 0) */}
          {status.activities?.find((a) => a.type === 0) && (
            <div className="space-y-2 pt-2 border-t border-coffee-200 dark:border-coffee-700">
              <div className="flex items-center gap-2 text-purple-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" />
                </svg>
                <span className="text-xs font-medium">Playing a game</span>
              </div>
              <div className="flex gap-3">
                {status.activities.find((a) => a.type === 0).assets?.large_image && (
                  <img
                    src={
                      status.activities
                        .find((a) => a.type === 0)
                        .assets.large_image.startsWith("mp:external")
                        ? `https://media.discordapp.net/external/${status.activities
                            .find((a) => a.type === 0)
                            .assets.large_image.replace("mp:external/", "")}`
                        : `https://cdn.discordapp.com/app-assets/${
                            status.activities.find((a) => a.type === 0).application_id
                          }/${status.activities.find((a) => a.type === 0).assets.large_image}.png`
                    }
                    alt={status.activities.find((a) => a.type === 0).name}
                    className="w-12 h-12 rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-coffee-900 dark:text-white truncate">
                    {status.activities.find((a) => a.type === 0).name}
                  </p>
                  {status.activities.find((a) => a.type === 0).details && (
                    <p className="text-xs text-coffee-600 dark:text-coffee-400 truncate">
                      {status.activities.find((a) => a.type === 0).details}
                    </p>
                  )}
                  {status.activities.find((a) => a.type === 0).state && (
                    <p className="text-xs text-coffee-500 dark:text-coffee-500 truncate">
                      {status.activities.find((a) => a.type === 0).state}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
