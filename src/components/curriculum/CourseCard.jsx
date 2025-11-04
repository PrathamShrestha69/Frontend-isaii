import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{course.description}</p>
          <p className="text-gray-400 text-sm">
            {course.completed} of {course.modules} modules completed
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            course.progress === 100
              ? 'bg-green-500/20 text-green-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {course.progress}%
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span>{course.completed}/{course.modules}</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm py-2 hover:bg-gray-700 rounded-lg transition-all">
        {course.progress === 100 ? (
          <>
            <CheckCircle size={16} />
            Review Course
          </>
        ) : (
          <>
            Continue Learning
            <ChevronRight size={16} />
          </>
        )}
      </button>
    </div>
  );
};

export default CourseCard;