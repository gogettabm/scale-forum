import { Link } from "react-router-dom";
import { scaleMeta } from "../data/scales";
import { timeAgo } from "../utils/time";
import "./PostCard.css";

// Feed card. Per the spec this shows ONLY the creation time, title, and
// upvote count — body text and images live on the individual post page.
function PostCard({ post }) {
  const meta = scaleMeta(post.scale);
  const slug = post.scale?.toLowerCase();

  return (
    <Link to={`/post/${post.id}`} className={`pcard pcard--${slug}`}>
      <div className="pcard__votes">
        <span className="pcard__arrow" aria-hidden="true">
          ▲
        </span>
        <span className="pcard__count">{post.upvotes ?? 0}</span>
        <span className="pcard__votelabel">
          {post.upvotes === 1 ? "vote" : "votes"}
        </span>
      </div>

      <div className="pcard__body">
        <h2 className="pcard__title">{post.title}</h2>
        <div className="pcard__foot">
          <span className={`scaletag scaletag--${slug}`}>
            <span aria-hidden="true">{meta.emoji}</span> {post.scale}
          </span>
          <span className="pcard__dot" aria-hidden="true">
            ●
          </span>
          <span className="pcard__time">{timeAgo(post.created_at)}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
