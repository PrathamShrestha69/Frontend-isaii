import React from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const { user, isAuthenticated, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
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
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-white font-semibold text-sm">{user?.name}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white">
                {user?.avatar}
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
