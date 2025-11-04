import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { AlertCircle } from "lucide-react";
import QuestionNavigator from "../components/test/QuestionNavigator";
import TestResults from "../components/test/TestResults";

const Test = () => {
  const navigate = useNavigate();
  const { selectedTest, questions } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Redirect if no test selected
  useEffect(() => {
    if (!selectedTest) {
      navigate("/challenges");
    }
  }, [selectedTest, navigate]);

  // Timer
  useEffect(() => {
    if (!isPaused && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPaused, timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleSubmit = () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
      setShowResults(true);
    }
  };

  const handleRetake = () => {
    setShowResults(false);
    setCurrentQuestion(1);
    setTimeLeft(2700);
    setAnswers({});
    setIsPaused(false);
  };

  if (!selectedTest) {
    return null;
  }

  if (showResults) {
    return <TestResults selectedTest={selectedTest} onRetake={handleRetake} />;
  }

  const totalQuestions = selectedTest.questions;
  const currentQuestionData = questions[currentQuestion - 1] || questions[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{selectedTest.title}</h1>
        <div className="flex items-center gap-4">
          
          <button onClick={handleSubmit} className="btn-pink-red px-4 py-2 rounded-md font-semibold">
            End Test
          </button>
        </div>
      </div>

      {timeLeft < 300 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-red-400" size={24} />
          <div>
            <p className="text-red-400 font-semibold">Time Running Out!</p>
            <p className="text-red-300 text-sm">
              Less than 5 minutes remaining
            </p>
          </div>
        </div>
      )}

      {/* Three-column layout: navigator | question area | sidebar */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: "240px 1fr 320px" }}
      >
        {/* Left: Question Navigator */}
        <div>
          <QuestionNavigator
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            answers={answers}
            onQuestionSelect={setCurrentQuestion}
          />
        </div>

        {/* Center: Question Card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Question {currentQuestion} of {totalQuestions}
              </h2>
              <p className="text-gray-400 text-sm">
                {currentQuestionData.topic}
              </p>
            </div>
            <div className="text-gray-400 text-sm">
              Progress: {Math.round((currentQuestion / totalQuestions) * 100)}%
            </div>
          </div>

          <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-2xl text-white mb-4">
              {currentQuestionData.question}
            </h3>

            <div className="space-y-3">
              {currentQuestionData.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center gap-4 ${
                    answers[currentQuestion] === idx
                      ? "border-blue-500 bg-blue-900/60 text-white"
                      : "border-gray-700 bg-gray-900/40 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      answers[currentQuestion] === idx
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-600"
                    }`}
                  >
                    {answers[currentQuestion] === idx ? (
                      <span className="w-2 h-2 bg-white rounded-full" />
                    ) : null}
                  </span>
                  <div>
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom nav (sticky-like) */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <button
              onClick={() =>
                setCurrentQuestion(Math.max(1, currentQuestion - 1))
              }
              disabled={currentQuestion === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-all"
            >
              ← Previous
            </button>
            <div className="text-green-400 text-sm">
              Your answer is autosaved.
            </div>
            {currentQuestion === totalQuestions ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 btn-pink-red rounded-lg"
              >
                Submit Test
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(totalQuestions, currentQuestion + 1)
                  )
                }
                className="px-6 py-2 btn-pink-purple rounded-lg"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
            <div>
              <h4 className="text-sm text-gray-400 mb-3">Time Remaining</h4>
              <div className="flex items-center gap-3">
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-xl font-mono font-semibold">
                    {String(Math.floor(timeLeft / 3600)).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-xl font-mono font-semibold">
                    {String(Math.floor((timeLeft % 3600) / 60)).padStart(
                      2,
                      "0"
                    )}
                  </div>
                  <div className="text-xs text-gray-400">Minutes</div>
                </div>
                <div className="bg-gray-900 rounded-md p-3 text-center">
                  <div className="text-xl font-mono font-semibold">
                    {String(timeLeft % 60).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-400">Seconds</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">
                  {currentQuestion}/{totalQuestions}
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full mb-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{
                    width: `${(currentQuestion / totalQuestions) * 100}%`,
                  }}
                />
              </div>
              <button className="w-full bg-gray-800 text-gray-200 px-4 py-3 rounded-md border border-gray-700 mb-3">
                Flag for Review
              </button>
              <button
                onClick={handleSubmit}
                className="w-full btn-pink-purple px-4 py-3 rounded-md"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
