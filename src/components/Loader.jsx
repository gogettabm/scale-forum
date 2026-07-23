import "./Loader.css";

// Loading animation shown whenever data is being fetched (stretch feature).
function Loader({ label = "Loading…" }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__ring" />
      <span className="loader__label">{label}</span>
    </div>
  );
}

export default Loader;
