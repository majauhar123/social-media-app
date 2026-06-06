import { useState } from "react";
import API from "../services/api";

function CreatePost({ fetchPosts }) {
  const [text, setText] = useState("");

  const createPost = async () => {
    const storedData = JSON.parse(
      localStorage.getItem("user")
    );

    console.log("Stored Data:", storedData);

    const username =
      storedData?.user?.username ||
      storedData?.username;

    if (!username) {
      alert("User not found. Please login again.");
      return;
    }

    if (!text.trim()) {
      alert("Please write something!");
      return;
    }

    try {
      await API.post("/posts", {
        username,
        text,
      });

      setText("");

      alert("Post Created Successfully 🎉");

      if (fetchPosts) {
        fetchPosts();
      }
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
