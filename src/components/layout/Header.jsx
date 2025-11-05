import React, { useMemo } from "react";
import { Menu, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { isAuthenticated, logout, user } = useApp();
  const navigate = useNavigate();
  const me = user;

  const avatarInitials = useMemo(() => {
    if (!me) return "";
    if (me.avatar) return me.avatar;
    // Prefer username for initials, then name/fullName, then email
    const source =
      me.username || me.name || me.fullName || me.email || me.emailId || "";
    const parts = source.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1][0] || parts[0][1] || "")).toUpperCase();
  }, [me]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#111618] border-b border-gray-800 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-4 py-2 w-96">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search courses, tests, interviews..."
            className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              
              <div className="text-right">
                {/* Prefer username first as requested */}
                <p className="text-white font-semibold text-sm">
                  {me?.username || me?.name || me?.fullName}
                </p>
                <p className="text-gray-400 text-xs">
                  {me?.email || me?.emailId}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                {avatarInitials}
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-1 text-sm bg-gray-700 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="px-4 py-2 btn-pink-purple rounded">
                Log in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
