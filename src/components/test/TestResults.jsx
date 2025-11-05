import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Award, Clock } from "lucide-react";

// Compute realistic stats from answers and questions
const computeResults = (questions, answers, totalTime, timeLeft) => {
  const totalQuestions = questions?.length || 0;
  let correct = 0;
  let attempted = 0;
  const byTopic = new Map(); // topic -> { total, correct }

  questions?.forEach((q, idx) => {
    const userAns = answers?.[idx + 1];
    const isAttempted = userAns !== undefined && userAns !== null;
    if (isAttempted) attempted += 1;
    const isCorrect = isAttempted && userAns === q.correctAnswer;
    if (isCorrect) correct += 1;
    const topic = q.topic || "General";
    const node = byTopic.get(topic) || { total: 0, correct: 0 };
    node.total += 1;
    if (isCorrect) node.correct += 1;
    byTopic.set(topic, node);
  });

  const percentage = totalQuestions
    ? Math.round((correct / totalQuestions) * 100)
    : 0;
  const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;

  const timeSpent = Math.max(0, (totalTime || 0) - (timeLeft || 0));
  const mins = Math.floor(timeSpent / 60);
  const secs = timeSpent % 60;
  const timeTaken = `${String(mins).padStart(2, "0")}:${String(secs).padStart(
    2,
    "0"
  )}`;
  const timeSavedMins = Math.max(0, Math.floor((timeLeft || 0) / 60));
  const timeSaved = `${timeSavedMins} mins`;

  const topics = Array.from(byTopic.entries()).map(([name, data]) => ({
    name,
    score: Math.round((data.correct / data.total) * 100),
  }));

  // Recommend topics below threshold
  const recommendations = topics
    .filter((t) => t.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((t) => `${t.name} - Practice`);

  return {
    score: correct, // 1 point per correct answer
    totalScore: totalQuestions,
    percentage,
    accuracy,
    timeTaken,
    timeSaved,
    topics,
    recommendations,
  };
};

const TestResults = ({
  selectedTest,
  onRetake,
  answers,
  questions,
  totalTime = 2700,
  timeLeft = 0,
}) => {
  const navigate = useNavigate();
  const results = useMemo(
    () => computeResults(questions, answers, totalTime, timeLeft),
    [questions, answers, totalTime, timeLeft]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <Award size={48} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">
          Test Results: {selectedTest.title}
        </h1>
        <p className="text-blue-100">Summary</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Score</p>
          <p className="text-4xl font-bold text-white mb-1">
            {results.score}
            <span className="text-gray-400 text-2xl">
              /{results.totalScore}
            </span>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: `${results.percentage}%` }}
              />
            </div>
            <span className="text-blue-400 font-semibold">
              {results.percentage}%
            </span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-400" />
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">
            {results.accuracy}%
          </p>
          <p className="text-green-400 text-sm mt-3">Excellent performance!</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-yellow-400" />
            <p className="text-gray-400 text-sm">Time Taken</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">
            {results.timeTaken}
          </p>
          <p className="text-yellow-400 text-sm mt-3">
            {results.timeSaved} saved
          </p>
        </div>
      </div>

      {/* Topic Performance & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Performance */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" />
            Topic-wise Performance
          </h3>
          <div className="space-y-4">
            {results.topics.map((topic, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">{topic.name}</span>
                  <span className="text-white font-semibold">
                    {topic.score}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: `${topic.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-bold mb-4">Recommended Practice</h3>
          <div className="space-y-3">
            {(results.recommendations.length
              ? results.recommendations
              : ["Revise weak areas"]
            ).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
              >
                <span className="text-gray-300 text-sm">{item}</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                  Practice
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/challenges")}
          className="flex-1 py-3 bg-gray-800 text-white rounded-lg font-semibold border border-gray-700 hover:bg-gray-700 transition-all"
        >
          Back to Challenges
        </button>
        <button
          onClick={onRetake}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
        >
          Retake Test
        </button>
      </div>
    </div>
  );
};

export default TestResults;
