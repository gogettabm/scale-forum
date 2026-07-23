import { Routes, Route, Link, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import "./App.css";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="app">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand__mark">◎</span>
          <span className="brand__text">
            Scale
            <span className="brand__tag">climate, from the globe to your block</span>
          </span>
        </Link>

        <nav className="topbar__nav">
          <Link
            to="/"
            className={`navlink ${pathname === "/" ? "is-active" : ""}`}
          >
            Feed
          </Link>
          <Link
            to="/create"
            className={`navlink navlink--cta ${
              pathname === "/create" ? "is-active" : ""
            }`}
          >
            + New Post
          </Link>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </main>

      <footer className="footer">
        Built for CodePath WEB102 · Climate impacts cascade — global to local.
      </footer>
    </div>
  );
}

export default App;
