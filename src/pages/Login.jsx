import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import api from "../lib/api";

const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // attempt login; include credentials in case backend uses cookie-based sessions
      const res = await api.post(
        "/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // try several shapes for token/user
      const authHeader =
        res.headers?.authorization || res.headers?.Authorization;
      const headerToken =
        typeof authHeader === "string"
          ? authHeader.toLowerCase().startsWith("bearer ")
            ? authHeader.split(/bearer\s+/i)[1]
            : authHeader
          : undefined;
      let token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.jwt ||
        res.data?.authToken ||
        res.data?.data?.token ||
        headerToken;
      // normalize if token string accidentally includes the Bearer prefix
      if (typeof token === "string" && /bearer\s+/i.test(token)) {
        token = token.split(/bearer\s+/i)[1];
      }
      let userFromServer = res.data?.user ?? res.data?.data ?? res.data;

      // If server didn't return token/user, attempt to fetch current user (useful when server sets cookie)
      if (
        !token &&
        (!userFromServer || Object.keys(userFromServer).length === 0)
      ) {
        try {
          const me = await api.get("/auth/me", { withCredentials: true });
          userFromServer = me.data?.user ?? me.data;
        } catch (meErr) {
          // ignore; we'll handle below
          console.warn("auth/me fetch after login failed", meErr);
        }
      }

      if (token || (userFromServer && Object.keys(userFromServer).length > 0)) {
        login(userFromServer, token);
        // Always go to dashboard after login
        navigate("/", { replace: true });
        return;
      }

      setError("Login failed: unexpected server response");
    } catch (err) {
      console.error("Login error:", err);
      const resp = err?.response;
      if (resp) {
        const data = resp.data;
        if (data) {
          if (typeof data === "string") setError(data);
          else if (data.message) setError(data.message);
          else if (data.errors) setError(JSON.stringify(data.errors));
          else setError(JSON.stringify(data));
        } else {
          setError(`Request failed: ${resp.status} ${resp.statusText}`);
        }
      } else if (err?.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError(err.message || "Network error - please try again");
      }
    } finally {
      setLoading(false);
    }
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
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-pink-purple py-2 rounded disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
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
