import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="text-gray-400 hover:text-white" size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Notifications</h2>
      </div>
      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-gray-700">
        <p className="text-gray-400">No notifications yet.</p>
      </div>
    </div>
  );
};

export default Notifications;
