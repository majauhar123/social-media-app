import API from "../services/api";

function PostCard({ post, fetchPosts }) {

  const likePost = async () => {
    try {
      await API.put(
        `/posts/${post._id}/like`,
        {
          username: "Ali"
        }
      );

      fetchPosts();

    } catch (error) {
      console.log(error);
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
          ❤️ {post.likes.length}
        </button>

        <button>
          💬 {post.comments.length}
        </button>

      </div>

      {post.comments.length > 0 && (
        <div
          style={{
            marginTop: "15px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px"
          }}
        >
          <h4>Comments</h4>

          {post.comments.map((comment) => (
            <p key={comment._id}>
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