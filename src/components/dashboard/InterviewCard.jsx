import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const InterviewCard = ({ interview }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all card-hover">
      <div
        className="h-32"
        style={{ background: interview.gradient }}
      />
      <div className="p-4">
        <h3 className="text-white font-bold mb-1 text-lg">{interview.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{interview.company}</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>{interview.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock size={14} />
            <span>{interview.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;