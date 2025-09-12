import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="p-8 border rounded shadow-md w-96">
        <h2 className="text-2xl mb-4 font-bold text-center">Signup</h2>
        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">
          Signup
        </button>
        <p className="mt-3 text-center">
          Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
        </p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
