import { useState } from "react";
import API from "../services/api";

function PostCard({ post, fetchPosts }) {
  const [comment, setComment] = useState("");

  const storedData = JSON.parse(
    localStorage.getItem("user")
  );

  const username =
    storedData?.user?.username;

  const likePost = async () => {
    try {
      await API.put(
        `/posts/${post._id}/like`,
        {
          username,
        }
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to like post");
    }
  };

  const addComment = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      await API.put(
        `/posts/${post._id}/comment`,
        {
          username,
          text: comment,
        }
      );

      setComment("");
      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to add comment");
    }
  };

  return (
    <div className="card">
      <h3 className="post-user">
        👤 {post.username}
      </h3>

      <p className="post-text">
        {post.text}
      </p>

      <div className="post-actions">
        <button onClick={likePost}>
          ❤️ {post.likes?.length || 0}
        </button>

        <button>
          💬 {post.comments?.length || 0}
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button onClick={addComment}>
          Comment
        </button>
      </div>

      {post.comments?.length > 0 && (
        <div
          style={{
            marginTop: "15px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
          }}
        >
          <h4>Comments</h4>

          {post.comments.map((comment, index) => (
            <p key={index}>
              <strong>
                {comment.username}:
              </strong>{" "}
              {comment.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostCard;
