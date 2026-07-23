import { useEffect, useState } from "react";
import { supabase } from "../client";
import Loader from "./Loader";
import { timeAgo } from "../utils/time";
import "./Comments.css";

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    setComments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // CREATE a comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    const { error } = await supabase
      .from("comments")
      .insert({ post_id: postId, content: text.trim() });
    setPosting(false);
    if (error) {
      alert("Couldn't post comment: " + error.message);
      return;
    }
    setText("");
    load();
  };

  // DELETE a comment
  const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    await supabase.from("comments").delete().eq("id", commentId);
    load();
  };

  return (
    <section className="comments">
      <h2 className="comments__title">
        Comments {!loading && `(${comments.length})`}
      </h2>

      <form className="comments__form" onSubmit={handleSubmit}>
        <textarea
          className="comments__input"
          rows="3"
          placeholder="Add to the discussion…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Write a comment"
        />
        <button className="comments__submit" type="submit" disabled={posting}>
          {posting ? "Posting…" : "Comment"}
        </button>
      </form>

      {loading ? (
        <Loader label="Loading comments…" />
      ) : comments.length === 0 ? (
        <p className="comments__empty">
          No comments yet — start the conversation.
        </p>
      ) : (
        <ul className="comments__list">
          {comments.map((c) => (
            <li className="comment" key={c.id}>
              <p className="comment__text">{c.content}</p>
              <div className="comment__meta">
                <span>{timeAgo(c.created_at)}</span>
                <button
                  className="comment__delete"
                  onClick={() => handleDelete(c.id)}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Comments;
