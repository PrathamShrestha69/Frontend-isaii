import React, { createContext, useContext, useState, useEffect } from "react";
import {
  interviews,
  challenges,
  curriculum,
  mockQuestions,
} from "../data/mockData";
import api, { setAuthToken } from "../lib/api";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // user is fetched from server; nothing is stored in localStorage
  const [user, setUser] = useState(null);
  const [interviewsList] = useState(interviews);
  const [challengesList] = useState(challenges);
  const [curriculumList] = useState(curriculum);
  const [questions] = useState(mockQuestions);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});

  // normalize user shape from backend to consistent fields
  const normalizeUser = (u) => {
    if (!u || typeof u !== "object") return null;
    const name = u.name || u.username || u.fullName || null;
    const email = u.email || u.emailId || null;
    return { ...u, name, email };
  };

  // robustly extract user object from various API response shapes
  const extractUser = (respData) => {
    if (!respData) return null;
    // common shapes: {user}, {data: user}, {data: {user}}, or the user itself
    if (respData.user) return respData.user;
    if (respData.data) {
      if (respData.data.user) return respData.data.user;
      return respData.data;
    }
    return respData;
  };

  // Do not call /auth/me on load; only do it right after a successful login
  useEffect(() => {
    // no-op: auth is established via login() only
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    // login may be called with (userData, token). If userData is missing but token is present
    // try to fetch current user from the server (useful when backend returns token only or uses cookies).
    login: async (userData, token) => {
      // set in-memory bearer if provided
      if (token) setAuthToken(token);

      // Always verify session by calling /auth/me right after login
      try {
        const res = await api.get("/auth/me");
        const serverUser = extractUser(res?.data);
        const normalized = normalizeUser(serverUser);
        if (normalized) {
          setUser(normalized);
          return;
        }
      } catch (err) {
        // If /auth/me fails (e.g., backend returns token but cookie not set), fall back to provided userData
        console.warn("login: /auth/me failed after login", err);
      }

      if (userData) {
        const normalized = normalizeUser(userData);
        setUser(normalized);
      } else {
        setUser(null);
      }
    },
    // update user profile on server and refresh local user state
    updateUser: async (updates) => {
      try {
        // if your backend supports updating current user at /auth/me
        const res = await api.put("/auth/me", updates);
        const updated = res?.data?.user ?? res?.data ?? null;
        const normalized = normalizeUser(updated);
        if (normalized) {
          setUser(normalized);
        }
        return { success: true, user: normalized };
      } catch (err) {
        return { success: false, error: err };
      }
    },
    logout: () => {
      setUser(null);
      setAuthToken(null);
    },
    interviewsList,
    challengesList,
    curriculumList,
    questions,
    selectedTest,
    setSelectedTest,
    testAnswers,
    setTestAnswers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
