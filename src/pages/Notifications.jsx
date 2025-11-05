import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

const Notifications = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await api.get("/notifications");
        if (!mounted) return;
        const data = res?.data?.notifications ?? res?.data ?? [];
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        setItems([]);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

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
        {items === null ? (
          <p className="text-gray-400">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400">No notifications yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((n, i) => (
              <li
                key={i}
                className={`p-3 rounded ${
                  n.read ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-semibold">
                      {n.title ?? "Notification"}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {n.body ?? n.message ?? ""}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">{n.time ?? ""}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
