import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const API_BASE = "http://localhost:3001/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("admin_token", data.token);
        navigate("services");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/80 to-accent/80 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-xs bg-white/90 rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in backdrop-blur-md">
        <div className="flex flex-col items-center mb-2">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg shadow mb-2" />
          <h2 className="text-2xl font-extrabold text-primary mb-1 tracking-wide">Admin Login</h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition mb-2 bg-white/80 placeholder-gray-400"
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition mb-2 bg-white/80 placeholder-gray-400"
        />
        <button type="submit" className="w-full py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark transition shadow-md disabled:opacity-60" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login; 