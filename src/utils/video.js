// Turn a normal YouTube link into an embeddable URL.
// Supports youtube.com/watch?v=ID, youtu.be/ID, and /embed/ID.
export function youTubeEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let id = null;

    if (u.hostname.includes("youtu.be")) {
      id = u.pathname.slice(1);
    } else if (u.pathname.startsWith("/embed/")) {
      id = u.pathname.split("/embed/")[1];
    } else {
      id = u.searchParams.get("v");
    }

    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null; // not a valid URL
  }
}
