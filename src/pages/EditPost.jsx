import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import PostForm from "../components/PostForm";
import Loader from "../components/Loader";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
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

  // UPDATE
  const handleUpdate = async (values) => {
    const { error } = await supabase.from("posts").update(values).eq("id", id);
    if (error) {
      alert("Error updating post: " + error.message);
      return;
    }
    navigate(`/post/${id}`);
  };

  if (loading) return <Loader label="Loading post…" />;
  if (!post) return <p className="page__status">Post not found.</p>;

  return (
    <div className="page">
      <h1 className="page__title">Edit post</h1>
      <p className="page__sub">Update your post below.</p>
      <PostForm
        initial={post}
        onSubmit={handleUpdate}
        submitLabel="Save changes"
        showSecret={false}
      />
    </div>
  );
}

export default EditPost;
