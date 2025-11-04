import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
 
    try {
      const raw = localStorage.getItem("pp_user");
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored.email === email && stored.password === password) {
          login(stored);
          navigate(from, { replace: true });
          return;
        }
        setError("Invalid email or password");
        return;
      }
    } catch (e) {
     
    }

    
    const avatar = (name || email).slice(0, 2).toUpperCase();
    const user = { name: name || "User", email, avatar, password };
    login(user);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700"
          />
        </div>
        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700"
          />
        </div>
        {error && <div className="text-sm text-red-400">{error}</div>}
        <button type="submit" className="w-full btn-pink-purple py-2 rounded">
          Log in
        </button>
      </form>
      <p className="text-gray-400 text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-400">
          Sign up
        </Link>
      </p>
      </div>
    </div>
  );
};

export default Login;
