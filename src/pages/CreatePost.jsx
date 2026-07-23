import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import PostForm from "../components/PostForm";

function CreatePost() {
  const navigate = useNavigate();

  // CREATE
  const handleCreate = async (values) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({ ...values, upvotes: 0 })
      .select()
      .single();

    if (error) {
      alert("Error creating post: " + error.message);
      return;
    }
    navigate(`/post/${data.id}`);
  };

  return (
    <div className="page">
      <h1 className="page__title">Start a discussion</h1>
      <p className="page__sub">
        Tag your post with the scale of impact so others can see where it fits
        in the bigger picture.
      </p>
      <PostForm onSubmit={handleCreate} submitLabel="Publish post" />
    </div>
  );
}

export default CreatePost;
