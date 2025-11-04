import React, { createContext, useContext, useState, useEffect } from "react";
import {
  mockUser,
  interviews,
  challenges,
  curriculum,
  mockQuestions,
} from "../data/mockData";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // user is null when not authenticated; try to restore from localStorage for a simple persistence
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("pp_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [interviewsList] = useState(interviews);
  const [challengesList] = useState(challenges);
  const [curriculumList] = useState(curriculum);
  const [questions] = useState(mockQuestions);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});

  const value = {
    user,
    isAuthenticated: !!user,
    login: (userData) => {
      setUser(userData);
      try {
        localStorage.setItem("pp_user", JSON.stringify(userData));
      } catch (e) {}
    },
    logout: () => {
      setUser(null);
      try {
        localStorage.removeItem("pp_user");
      } catch (e) {}
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
