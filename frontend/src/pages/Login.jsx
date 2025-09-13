import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (res.ok) {
        login(data.username, data.token);
        navigate("/restaurants");
      } else {
        setError(data.message || `Login failed (${res.status})`);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="auth-hero">
      <div className="wrapper">
        <div className="title">Online Food Order</div>
        <div className="subtitle">Welcome back! Please sign in.</div>
        <form onSubmit={handleLogin} className="card form" style={{ marginTop: 8 }}>
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
            Sign in
          </button>
          <p className="helper" style={{ marginTop: 12 }}>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          {error && <p style={{ color: "#ef4444", marginTop: 8 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
