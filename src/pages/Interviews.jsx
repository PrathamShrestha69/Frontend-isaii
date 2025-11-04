import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import InterviewCard from "../components/dashboard/InterviewCard";
import { Plus, Calendar, Video, Clock } from "lucide-react";

const Interviews = () => {
  const { interviewsList } = useApp();

  const [activeTab, setActiveTab] = useState("topics");
  const interview = interviewsList[0] || null; // show first interview detail for now

  const topics = [
    { id: 1, label: "Data Structures & Algorithms", tag: "Core" },
    { id: 2, label: "System Design", tag: "Core" },
    { id: 3, label: "Behavioral Questions", tag: "Important" },
    { id: 4, label: "Object-Oriented Design", tag: "Core" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <nav className="text-sm text-gray-400 mb-3">
          All Interviews /{" "}
          <span className="text-white">
            {interview?.company} {interview ? `- ${interview.title}` : ""}
          </span>
        </nav>

        {/* Header card */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 bg-gray-900 rounded-md flex items-center justify-center text-gray-400">
              {/* placeholder image */}
              <span className="text-xs">Logo</span>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {interview?.company || "Company"} - {interview?.title || "Role"}
              </h2>
              <p className="text-gray-400 mt-1">Package: $150,000 / year</p>

              <div className="mt-4">
                <div className="bg-blue-900/50 text-blue-100 px-4 py-3 rounded-md border border-blue-800 w-full max-w-2xl">
                  Complete your Placement Assessment Questionnaire (PAQ) for
                  tailored tips.
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex gap-3">
                <button className="btn-pink-purple px-5 py-3">
                  Start Full Mock
                </button>
                <button className="btn-pink-purple px-5 py-3">
                  Practice Rounds
                </button>
                <button className="bg-gray-700 text-gray-200 px-4 py-3 rounded-md">
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="flex items-center gap-6 border-b border-gray-700 pb-3">
            <button
              onClick={() => setActiveTab("topics")}
              className={`text-sm pb-2 ${
                activeTab === "topics"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Topics Required
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`text-sm pb-2 ${
                activeTab === "past"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Past Questions
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`text-sm pb-2 ${
                activeTab === "tips"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400"
              }`}
            >
              Candidate Tips
            </button>
          </div>

          <div className="mt-6">
            {activeTab === "topics" && (
              <div className="space-y-3">
                {topics.map((t) => (
                  <label
                    key={t.id}
                    className="flex items-center justify-between bg-gray-900 border border-gray-700 rounded-md p-4"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-500 rounded-md"
                      />
                      <span className="text-white">{t.label}</span>
                    </div>
                    <span className="text-sm text-gray-400">{t.tag}</span>
                  </label>
                ))}
              </div>
            )}

            {activeTab === "past" && (
              <div className="text-gray-400">
                No past questions available yet.
              </div>
            )}

            {activeTab === "tips" && (
              <div className="text-gray-400">
                Candidate tips will appear here.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Interviews Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Upcoming Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {interviewsList.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
