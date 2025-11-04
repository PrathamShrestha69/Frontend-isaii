import React, { useState } from "react";
import { Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const ChallengeCard = ({ challenge }) => {
  const navigate = useNavigate();
  const { setSelectedTest } = useApp();

  const handleStart = () => {
    setSelectedTest({ ...challenge, difficulty: selectedDifficulty });
    navigate("/test");
  };

  const [selectedDifficulty, setSelectedDifficulty] = useState(
    challenge.difficulty || "Medium"
  );

  const difficultyColors = {
    Easy: "bg-green-500/20 text-green-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Hard: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all card-hover shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-900 rounded-xl shadow-md">
          <FileText size={20} className="text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {challenge.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-400 text-sm mb-2">Topics covered:</p>
        <div className="flex flex-wrap gap-2">
          {challenge.topics.map((topic, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between gap-3 mb-4 bg-black p-2 rounded-lg">
        {["Easy", "Medium", "Hard"].map((d) => {
          const isSelected = selectedDifficulty === d;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-1 text-sm rounded-lg font-medium focus:outline-none transition-colors ${
                isSelected
                  ? "bg-gray-700 text-white"
                  : "bg-black text-gray-400 hover:bg-gray-700/50"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="flex flex-row items-center px-5">
        <div className="flex-1">
          <button
            onClick={handleStart}
            className="btn-pink-purple w-full md:w-auto px-6 py-3"
          >
            Start Practice
          </button>
        </div>

        <div>
          <button className="btn-pink-red px-5 py-3">Customize</button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
