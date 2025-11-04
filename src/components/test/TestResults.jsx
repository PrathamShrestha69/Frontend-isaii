import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Award, Clock } from 'lucide-react';

const TestResults = ({ selectedTest, onRetake }) => {
  const navigate = useNavigate();

  const mockResults = {
    score: 180,
    totalScore: 200,
    percentage: 90,
    accuracy: 85,
    timeTaken: '38:20',
    timeSaved: '6 mins',
    topics: [
      { name: 'Quantitative Aptitude', score: 92 },
      { name: 'Logical Reasoning', score: 85 },
      { name: 'Data Interpretation', score: 78 }
    ],
    recommendations: [
      'Data Interpretation - Advanced',
      'Probability & Statistics'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
        <Award size={48} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Test Results: {selectedTest.title}</h1>
        <p className="text-blue-100">Mock Test 1</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Score</p>
          <p className="text-4xl font-bold text-white mb-1">
            {mockResults.score}
            <span className="text-gray-400 text-2xl">/{mockResults.totalScore}</span>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                style={{ width: `${mockResults.percentage}%` }}
              />
            </div>
            <span className="text-blue-400 font-semibold">{mockResults.percentage}%</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-400" />
            <p className="text-gray-400 text-sm">Accuracy</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{mockResults.accuracy}%</p>
          <p className="text-green-400 text-sm mt-3">Excellent performance!</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-yellow-400" />
            <p className="text-gray-400 text-sm">Time Taken</p>
          </div>
          <p className="text-4xl font-bold text-white mb-1">{mockResults.timeTaken}</p>
          <p className="text-yellow-400 text-sm mt-3">{mockResults.timeSaved} saved</p>
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
            {mockResults.topics.map((topic, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">{topic.name}</span>
                  <span className="text-white font-semibold">{topic.score}%</span>
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
            {mockResults.recommendations.map((item, idx) => (
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
          onClick={() => navigate('/challenges')}
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