import React, { useState } from 'react';
import ResumeUpload from '../components/resume/ResumeUpload';
import AIAnalysis from '../components/resume/AIAnalysis';
import { BarChart3, Target, Award } from 'lucide-react';

const Resume = () => {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Your Resume</h1>
        <p className="text-gray-400">Upload and optimize your resume with AI-powered insights</p>
      </div>

      {/* Upload & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResumeUpload uploaded={uploaded} setUploaded={setUploaded} />
        <AIAnalysis uploaded={uploaded} />
      </div>

      {/* Resume Analysis */}
      {uploaded && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-purple-400" />
            Resume Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-gray-700 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-3">
                <Target size={32} className="text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">85%</p>
              <p className="text-gray-400 text-sm">ATS Score</p>
              <div className="mt-3 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-[85%]" />
              </div>
            </div>

            <div className="text-center p-6 bg-gray-700 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-3">
                <Award size={32} className="text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">12</p>
              <p className="text-gray-400 text-sm">Keywords Matched</p>
              <p className="text-purple-400 text-xs mt-2">Out of 15 recommended</p>
            </div>

            <div className="text-center p-6 bg-gray-700 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-3">
                <BarChart3 size={32} className="text-green-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">Good</p>
              <p className="text-gray-400 text-sm">Overall Rating</p>
              <p className="text-green-400 text-xs mt-2">Above average</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Section-wise Score</h4>
            <div className="space-y-3">
              {[
                { name: 'Contact Information', score: 100 },
                { name: 'Work Experience', score: 85 },
                { name: 'Skills', score: 90 },
                { name: 'Education', score: 95 },
                { name: 'Projects', score: 75 }
              ].map((section, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 text-sm">{section.name}</span>
                    <span className="text-white font-semibold text-sm">{section.score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        section.score >= 90
                          ? 'bg-gradient-to-r from-green-500 to-green-400'
                          : section.score >= 75
                          ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                          : 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                      }`}
                      style={{ width: `${section.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;