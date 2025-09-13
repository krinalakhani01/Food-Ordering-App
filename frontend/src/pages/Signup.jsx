import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message || `Signup failed (${res.status})`);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="auth-hero">
      <div className="wrapper">
        <div className="title">Online Food Order</div>
        <div className="subtitle">Create an account to continue</div>
        <form onSubmit={handleSignup} className="card form" style={{ marginTop: 8 }}>
          <input
            className="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div style={{ height: 10 }} />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div style={{ height: 14 }} />
          <button className="btn" type="submit">
            Create account
          </button>
          <p className="helper" style={{ marginTop: 12 }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          {error && <p style={{ color: "#ef4444", marginTop: 8 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
