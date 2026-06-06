import { useEffect, useState } from "react";
import API from "../services/api";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="feed-title">
        <h1>Social Media Feed</h1>

        <button
          onClick={logout}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Logout
        </button>
      </div>

      <CreatePost fetchPosts={fetchPosts} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          fetchPosts={fetchPosts}
        />
      ))}
    </div>
  );
}

export default Feed;