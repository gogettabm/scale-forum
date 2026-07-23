import { useState } from "react";
import { SCALES } from "../data/scales";
import "./PostForm.css";

// Shared form for creating and editing a post.
function PostForm({ initial, onSubmit, submitLabel, showSecret = true }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url || "");
  const [videoUrl, setVideoUrl] = useState(initial?.video_url || "");
  const [scale, setScale] = useState(initial?.scale || "Global");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please give your post a title.");
      return;
    }
    const payload = {
      title: title.trim(),
      content: content.trim() || null,
      image_url: imageUrl.trim() || null,
      video_url: videoUrl.trim() || null,
      scale,
    };
    // Only set a secret key when creating a post.
    if (showSecret && secretKey.trim()) payload.secret_key = secretKey.trim();
    onSubmit(payload);
  };

  return (
    <form className="pform" onSubmit={handleSubmit}>
      <label className="pform__label" htmlFor="title">
        Title <span className="pform__req">required</span>
      </label>
      <input
        id="title"
        className="pform__input"
        type="text"
        placeholder="e.g. Why my neighborhood floods every spring now"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="pform__label">Scale of impact</label>
      <div className="pform__scales">
        {SCALES.map((s) => (
          <button
            type="button"
            key={s.key}
            className={`scaleopt ${scale === s.key ? "is-selected" : ""}`}
            onClick={() => setScale(s.key)}
          >
            <span className="scaleopt__emoji" aria-hidden="true">
              {s.emoji}
            </span>
            <span className="scaleopt__key">{s.key}</span>
            <span className="scaleopt__blurb">{s.blurb}</span>
          </button>
        ))}
      </div>

      <label className="pform__label" htmlFor="content">
        Content <span className="pform__opt">optional</span>
      </label>
      <textarea
        id="content"
        className="pform__input pform__textarea"
        rows="6"
        placeholder="Share the details, your data, or your question…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="pform__label" htmlFor="image">
        Image URL <span className="pform__opt">optional</span>
      </label>
      <input
        id="image"
        className="pform__input"
        type="url"
        placeholder="https://example.com/glacier.jpg"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <label className="pform__label" htmlFor="video">
        Video URL <span className="pform__opt">optional — YouTube link</span>
      </label>
      <input
        id="video"
        className="pform__input"
        type="url"
        placeholder="https://www.youtube.com/watch?v=…"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      {showSecret && (
        <>
          <label className="pform__label" htmlFor="secret">
            Secret key <span className="pform__opt">optional</span>
          </label>
          <input
            id="secret"
            className="pform__input"
            type="text"
            placeholder="Set a key to protect editing/deleting this post"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
          <p className="pform__hint">
            If you set a key, you'll need it to edit or delete this post later.
          </p>
        </>
      )}

      <button type="submit" className="pform__submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
