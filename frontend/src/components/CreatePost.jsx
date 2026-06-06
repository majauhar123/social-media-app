import { useState } from "react";
import API from "../services/api";

function CreatePost({ fetchPosts }) {
  const [text, setText] = useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const createPost = async () => {
    if (!text.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      console.log("Logged User:", user);

      await API.post("/posts", {
        username: user?.user?.username,
        text,
      });

      setText("");
      fetchPosts();

      alert("Post Created Successfully 🎉");
    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.message ||
        "Failed to create post"
      );
    }
  };

  return (
    <div className="create-post">
      <h3>Create a New Post</h3>

      <input
        type="text"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={createPost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
