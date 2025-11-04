import React from 'react';
import { useApp } from '../context/AppContext';
import StatsCard from '../components/dashboard/StatsCard';
import InterviewCard from '../components/dashboard/InterviewCard';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user, interviewsList } = useApp();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Scheduled Interviews"
          value={user.streak}
          subtitle="Upcoming this month"
          color="blue"
        />
        <StatsCard
          title="Upcoming Tests"
          value={user.upcomingTests}
          subtitle="Next assessment"
          color="purple"
        />
        <StatsCard
          title="Learning Streak"
          value={user.learningStreak}
          subtitle="Course completion"
          color="green"
        />
      </div>

      {/* Interviews Section */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-white">My Interviews</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all font-semibold">
            <Plus size={20} />
            Schedule New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interviewsList.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;