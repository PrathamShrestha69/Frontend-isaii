export const mockUser = {
  name: "John Doe",
  email: "john.doe@email.com",
  avatar: "JD",
  streak: 5,
  upcomingTests: "Dec 15, 2023",
  learningStreak: "85%"
};

export const interviews = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp",
    date: "Dec 20, 2023",
    time: "10:00 AM",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    date: "Dec 22, 2023",
    time: "2:00 PM",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataCo",
    date: "Dec 25, 2023",
    time: "11:00 AM",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    status: "scheduled"
  },
  {
    id: 4,
    title: "UX Designer",
    company: "DesignHub",
    date: "Dec 28, 2023",
    time: "3:00 PM",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    status: "scheduled"
  }
];

export const challenges = [
  {
    id: 1,
    title: "Aptitude Round",
    description: "Test your analytical and quantitative skills",
    difficulty: "Medium",
    duration: "45 mins",
    questions: 20,
    topics: ["Quantitative", "Logical Reasoning", "Data Interpretation"]
  },
  {
    id: 2,
    title: "Coding Round",
    description: "Solve algorithmic problems and coding challenges",
    difficulty: "Hard",
    duration: "90 mins",
    questions: 3,
    topics: ["DSA", "Problem Solving", "Code Optimization"]
  },
  {
    id: 3,
    title: "HR & Behavioral",
    description: "Practice common HR and behavioral questions",
    difficulty: "Easy",
    duration: "30 mins",
    questions: 15,
    topics: ["Communication", "Situational Questions", "Company Fit"]
  }
];

export const curriculum = [
  {
    id: 1,
    title: "Data Structures",
    modules: 12,
    completed: 8,
    progress: 67,
    description: "Master fundamental data structures"
  },
  {
    id: 2,
    title: "Algorithms",
    modules: 15,
    completed: 5,
    progress: 33,
    description: "Learn essential algorithms"
  },
  {
    id: 3,
    title: "System Design",
    modules: 10,
    completed: 2,
    progress: 20,
    description: "Understand scalable system architecture"
  },
  {
    id: 4,
    title: "Database Basics",
    modules: 8,
    completed: 8,
    progress: 100,
    description: "SQL and NoSQL fundamentals"
  }
];

export const mockQuestions = [
  {
    id: 1,
    question: "What is the value of x if 3x + 15 = 45?",
    options: ["10", "15", "20", "25"],
    correctAnswer: 0,
    topic: "Quantitative Aptitude"
  },
  {
    id: 2,
    question: "If A is twice as old as B, and B is 15 years old, how old is A?",
    options: ["25", "30", "35", "40"],
    correctAnswer: 1,
    topic: "Logical Reasoning"
  },
  {
    id: 3,
    question: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 2,
    topic: "Quantitative Aptitude"
  }
];
