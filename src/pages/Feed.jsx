import { useEffect, useState } from "react";
import { supabase } from "../client";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import { SCALES } from "../data/scales";
import "./Feed.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("created_at"); // "created_at" | "upvotes"
  const [scaleFilter, setScaleFilter] = useState("All");

  // Re-fetch whenever the sort order changes (sorting happens in the query).
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order(orderBy, { ascending: false });
      if (!error) setPosts(data || []);
      setLoading(false);
    }
    fetchPosts();
  }, [orderBy]);

  // Search by title + filter by scale, both client-side over the fetched rows.
  const visible = posts.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesScale = scaleFilter === "All" || p.scale === scaleFilter;
    return matchesSearch && matchesScale;
  });

  return (
    <div className="feed">
      <section className="hero">
        <h1 className="hero__title">
          Climate at <em>every</em> scale
        </h1>
        <p className="hero__lede">
          The climate crisis isn't one story — it's the same story at different
          zoom levels. Tag your post by the scale of impact it discusses, then
          filter the feed to see how the global cascades down to the local.
        </p>
      </section>

      {/* Scale filter — the site's core organizing idea */}
      <div className="scalebar">
        <button
          className={`scalechip ${scaleFilter === "All" ? "is-active" : ""}`}
          onClick={() => setScaleFilter("All")}
        >
          All scales
        </button>
        {SCALES.map((s) => (
          <button
            key={s.key}
            className={`scalechip ${
              scaleFilter === s.key ? "is-active" : ""
            }`}
            onClick={() => setScaleFilter(s.key)}
            title={s.blurb}
          >
            <span aria-hidden="true">{s.emoji}</span> {s.key}
          </button>
        ))}
      </div>

      {/* Search + sort controls */}
      <div className="controls">
        <input
          className="controls__search"
          type="search"
          placeholder="Search posts by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search posts by title"
        />
        <div className="controls__sort">
          <span className="controls__label">Sort by</span>
          <button
            className={`sortbtn ${
              orderBy === "created_at" ? "is-active" : ""
            }`}
            onClick={() => setOrderBy("created_at")}
          >
            Newest
          </button>
          <button
            className={`sortbtn ${orderBy === "upvotes" ? "is-active" : ""}`}
            onClick={() => setOrderBy("upvotes")}
          >
            Most upvoted
          </button>
        </div>
      </div>

      {loading ? (
        <Loader label="Loading the feed…" />
      ) : visible.length === 0 ? (
        <p className="feed__empty">
          No posts yet. Be the first to start a discussion!
        </p>
      ) : (
        <div className="feed__list">
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feed;
