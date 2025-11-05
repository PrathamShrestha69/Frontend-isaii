import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import api from "../lib/api";

const Signup = () => {
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
    if (!email || !password) {
      setError("Please provide email and password");
      return;
    }
    (async () => {
      try {
        const res = await api.post("/auth/register", { name, email, password });

        // server may or may not return token/user on register. If token missing,
        // try to log in immediately (common pattern when backend doesn't auto-login)
        let token = res.data?.token ?? res.data?.accessToken;
        let userFromServer = res.data?.user ?? res.data;

        if (!token) {
          try {
            const loginRes = await api.post("/auth/login", { email, password });
            token = loginRes.data?.token ?? loginRes.data?.accessToken;
            userFromServer = loginRes.data?.user ?? loginRes.data;
          } catch (loginErr) {
            // login attempt failed; we'll handle below
            console.warn("Automatic login after register failed:", loginErr);
          }
        }

        if (token && userFromServer) {
          login(userFromServer, token);
          navigate(from, { replace: true });
          return;
        }

        // If we get here, registration likely succeeded but automatic login didn't work.
        // Inform the user and redirect them to login page so they can sign in manually.
        console.info(
          "Registration created the user but login was not completed."
        );
        setError("Registration succeeded — please log in.");
        navigate("/login", { replace: true, state: { from } });
      } catch (err) {
        // show detailed error in console and display a friendly message to the user
        console.error("Signup error:", err);
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
        } else {
          setError(err.message || "Registration failed");
        }
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Sign up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-300">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded bg-gray-900 text-white border border-gray-700"
            />
          </div>
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
            Create account
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
