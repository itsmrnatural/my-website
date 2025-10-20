import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Last.fm Now Playing component
 * Displays the currently playing or last played track from Last.fm
 * Following "Don't Make Me Think" - clear, simple presentation
 * @returns {JSX.Element} The Last.fm widget
 */
export default function LastFmNowPlaying() {
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        // Using Last.fm API endpoint
        // You'll need to set NEXT_PUBLIC_LASTFM_API_KEY in your environment
        const apiKey = process.env.NEXT_PUBLIC_LASTFM_API_KEY || "demo_key";
        const username = "itsmrnatural";

        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
        );

        const data = await response.json();

        if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
          const recentTrack = data.recenttracks.track[0];
          setTrack({
            name: recentTrack.name,
            artist: recentTrack.artist["#text"],
            album: recentTrack.album["#text"],
            image: recentTrack.image[2]["#text"], // Medium size image
            url: recentTrack.url,
            nowPlaying: recentTrack["@attr"]?.nowplaying === "true",
          });
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Last.fm data:", err);
        setError("Could not load music data");
        setLoading(false);
      }
    };

    fetchNowPlaying();

    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="border-t border-primary-cyan/20 pt-4 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-dark/50 rounded-md animate-pulse"></div>
          <div className="flex-1">
            <div className="h-3 bg-primary-dark/50 rounded w-2/3 mb-2 animate-pulse"></div>
            <div className="h-2 bg-primary-dark/50 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return null; // Don't show anything if there's an error or no track
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="border-t border-primary-cyan/20 pt-4 mt-6"
    >
      {/* Status indicator - Clear communication */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-karla font-medium text-primary-light/60">
          {track.nowPlaying ? "Listening Now" : "Last Played"}
        </span>
        {track.nowPlaying && (
          <span className="w-2 h-2 bg-primary-pink rounded-full animate-pulse"></span>
        )}
      </div>

      {/* Track info - Clear clickable area */}
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group hover:bg-primary-dark/30 -mx-2 px-2 py-2 rounded-md transition-colors"
      >
        {track.image && (
          <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden border border-primary-cyan/20">
            <img
              src={track.image}
              alt={`${track.name} album art`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-lora text-primary-light font-medium text-sm truncate group-hover:text-primary-cyan transition-colors">
            {track.name}
          </p>
          <p className="font-karla text-primary-light/60 text-xs truncate">by {track.artist}</p>
        </div>

        <i className="fas fa-external-link-alt text-primary-light/40 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
      </a>
    </motion.div>
  );
}
