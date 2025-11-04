import React from 'react';
import { useApp } from '../context/AppContext';
import ChallengeCard from '../components/challenges/ChallengeCard';

const Challenges = () => {
  const { challengesList } = useApp();

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Choose Your Challenge</h1>
        <p className="text-gray-400 text-lg">Select a track to test your placement readiness</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challengesList.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default Challenges;