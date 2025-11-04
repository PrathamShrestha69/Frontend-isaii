import React from 'react';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/curriculum/CourseCard';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

const Curriculum = () => {
  const { curriculumList } = useApp();

  const totalModules = curriculumList.reduce((sum, course) => sum + course.modules, 0);
  const completedModules = curriculumList.reduce((sum, course) => sum + course.completed, 0);
  const overallProgress = Math.round((completedModules / totalModules) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Course Curriculum</h1>
        <p className="text-gray-400">Master the skills you need for placement success</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BookOpen className="text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-white">{curriculumList.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Award className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">
                {completedModules}/{totalModules}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold text-white">{overallProgress}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="space-y-4">
        {curriculumList.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Curriculum;