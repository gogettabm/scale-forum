import { Link } from "react-router-dom";
import { scaleMeta } from "../data/scales";
import { timeAgo } from "../utils/time";
import "./PostCard.css";

// Feed card. Per the spec this shows ONLY the creation time, title, and
// upvote count — body text and images live on the individual post page.
function PostCard({ post }) {
  const meta = scaleMeta(post.scale);

  return (
    <Link to={`/post/${post.id}`} className="pcard">
      <div className="pcard__votes">
        <span className="pcard__arrow" aria-hidden="true">
          ▲
        </span>
        <span className="pcard__count">{post.upvotes ?? 0}</span>
      </div>

      <div className="pcard__body">
        <span className={`scaletag scaletag--${post.scale?.toLowerCase()}`}>
          {meta.emoji} {post.scale}
        </span>
        <h2 className="pcard__title">{post.title}</h2>
        <span className="pcard__time">posted {timeAgo(post.created_at)}</span>
      </div>
    </Link>
  );
}

export default PostCard;
