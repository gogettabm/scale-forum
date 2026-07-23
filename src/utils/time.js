// Turn a timestamp into a friendly relative string, e.g. "3 hours ago".
export function timeAgo(timestamp) {
  const then = new Date(timestamp).getTime();
  const seconds = Math.floor((Date.now() - then) / 1000);

  if (seconds < 60) return "just now";

  const units = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];

  for (const { label, secs } of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) {
      return `${value} ${label}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}
