import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';

const AIAnalysis = ({ uploaded }) => {
  // AI bata generation
  const suggestions = [
    {
      type: 'warning',
      icon: AlertCircle,
      text: 'Add more quantifiable achievements to your experience section',
      color: 'yellow'
    },
    {
      type: 'info',
      icon: Info,
      text: 'Consider adding relevant certifications for Software Engineer roles',
      color: 'blue'
    },
    {
      type: 'success',
      icon: CheckCircle,
      text: 'Your skills section is well optimized for ATS systems',
      color: 'green'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <TrendingUp size={20} className="text-blue-400" />
        AI Suggestions
      </h3>

      {!uploaded ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Upload your resume to get AI-powered suggestions</p>
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((suggestion, idx) => {
            const colorClasses = {
              yellow: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
              blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
              green: 'bg-green-500/10 border-green-500/30 text-green-300'
            };

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${colorClasses[suggestion.color]}`}
              >
                <div className="flex items-start gap-3">
                  <suggestion.icon size={20} className="mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{suggestion.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;