import React from 'react';

const StatsCard = ({ title, value, subtitle, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400'
  };

  return (
    <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className={`text-sm ${colorClasses[color]}`}>{subtitle}</p>
    </div>
  );
};

export default StatsCard;