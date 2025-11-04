import React from "react";

const QuestionNavigator = ({
  totalQuestions,
  currentQuestion,
  answers,
  onQuestionSelect,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex flex-col h-full">
      <p className="text-gray-400 text-sm mb-3">Questions</p>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onQuestionSelect(num)}
            className={`aspect-square rounded-md font-semibold text-sm transition-all ${
              num === currentQuestion
                ? "bg-blue-900 text-white ring-2 ring-blue-500"
                : answers[num] !== undefined
                ? "bg-green-900 text-green-300 border border-green-700"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="mt-auto text-sm text-gray-400">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full border border-blue-500 bg-transparent" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-green-600" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-transparent border border-gray-600" />
          <span>Not Answered</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigator;
