import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);

      alert("Account Created Successfully 🎉");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account 🚀</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value
            })
          }
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          required
        />

        <button type="submit">
          Sign Up
        </button>
      </form>

      <Link
        className="auth-link"
        to="/"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Signup;