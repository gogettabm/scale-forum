import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import Loader from "../components/Loader";
import Comments from "../components/Comments";
import { scaleMeta } from "../data/scales";
import { timeAgo } from "../utils/time";
import { youTubeEmbed } from "../utils/video";
import "./PostPage.css";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  // UPVOTE — each click adds one; users can upvote any number of times.
  const handleUpvote = async () => {
    const next = (post.upvotes ?? 0) + 1;
    setPost({ ...post, upvotes: next }); // optimistic update
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: next })
      .eq("id", post.id);
    if (error) {
      alert("Couldn't save your upvote: " + error.message);
      setPost({ ...post, upvotes: post.upvotes }); // roll back
    }
  };

  // DELETE — protected by the secret key if the author set one.
  const handleDelete = async () => {
    if (post.secret_key) {
      const entered = prompt("Enter the secret key to delete this post:");
      if (entered === null) return;
      if (entered !== post.secret_key) {
        alert("Incorrect secret key.");
        return;
      }
    } else if (!confirm("Delete this post? This cannot be undone.")) {
      return;
    }

    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      alert("Error deleting: " + error.message);
      return;
    }
    navigate("/");
  };

  const handleEdit = () => {
    if (post.secret_key) {
      const entered = prompt("Enter the secret key to edit this post:");
      if (entered === null) return;
      if (entered !== post.secret_key) {
        alert("Incorrect secret key.");
        return;
      }
    }
    navigate(`/post/${post.id}/edit`);
  };

  if (loading) return <Loader label="Loading post…" />;
  if (!post)
    return (
      <div className="page">
        <p>Post not found.</p>
        <Link to="/" className="backlink">
          ← Back to feed
        </Link>
      </div>
    );

  const meta = scaleMeta(post.scale);
  const embed = youTubeEmbed(post.video_url);

  return (
    <div className="page">
      <Link to="/" className="backlink">
        ← Back to feed
      </Link>

      <article className="post">
        <span className={`scaletag scaletag--${post.scale?.toLowerCase()}`}>
          {meta.emoji} {post.scale}
        </span>

        <h1 className="post__title">{post.title}</h1>
        <p className="post__time">posted {timeAgo(post.created_at)}</p>

        {post.content && <p className="post__content">{post.content}</p>}

        {post.image_url && (
          <img className="post__image" src={post.image_url} alt="" />
        )}

        {embed && (
          <div className="post__video">
            <iframe
              src={embed}
              title="Embedded video"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
          </div>
        )}

        <div className="post__actions">
          <button className="upvote" onClick={handleUpvote}>
            ▲ Upvote · <strong>{post.upvotes ?? 0}</strong>
          </button>
          <button className="btn btn--ghost" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn--danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>

      <Comments postId={post.id} />
    </div>
  );
}

export default PostPage;
