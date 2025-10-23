import fetch from "isomorphic-unfetch";
import useSWR from "swr";

/**
 * Custom SWR hook for fetching data with automatic revalidation
 * @param {string} url - The URL to fetch data from
 * @param {number} interval - Refresh interval in milliseconds (default: 1000)
 * @returns {Object} SWR response object with data, error, and isValidating properties
 */
export default function SWR(url, interval = 1000) {
  return useSWR(
    url,
    (href) =>
      fetch(href, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    { refreshInterval: interval }
  );
}
