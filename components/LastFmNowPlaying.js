import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Last.fm Now Playing component
 * Displays the currently playing or last played track from Last.fm
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
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white/10 rounded-md animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse"></div>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-blue-500/30 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <i className="fas fa-music text-blue-400 text-sm"></i>
        <h3 className="text-sm font-semibold text-white">
          {track.nowPlaying ? "Now Playing" : "Last Played"}
        </h3>
        {track.nowPlaying && (
          <div className="flex gap-1">
            <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse delay-75"></span>
            <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse delay-150"></span>
          </div>
        )}
      </div>

      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group"
      >
        {track.image && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
            <img
              src={track.image}
              alt={`${track.name} album art`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
            {track.name}
          </p>
          <p className="text-gray-400 text-xs truncate">{track.artist}</p>
          {track.album && <p className="text-gray-500 text-xs truncate">{track.album}</p>}
        </div>

        <i className="fas fa-external-link-alt text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
      </a>
    </motion.div>
  );
}
