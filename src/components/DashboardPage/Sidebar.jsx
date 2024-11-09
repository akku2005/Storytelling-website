// src/components/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaUser,
  FaPlus,
  FaSignOutAlt,
  FaCog,
  FaBook,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Use AuthContext

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaChartBar />,
      path: "/dashboard",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
    {
      name: "Create Story",
      icon: <FaPlus />,
      path: "/create-story",
    },
    {
      name: "My Stories",
      icon: <FaBook />,
      path: "/my-stories",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    logout(); // Use logout from context
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  return (
    <div
      className={`
      fixed md:relative z-50 w-64 bg-white shadow-lg h-full 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
    >
      {/* Close button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden absolute top-4 right-4 text-2xl"
      >
        ✕
      </button>

      {/* User Profile Header */}
      {user && (
        <div className="p-6 border-b flex items-center">
          <img
            src={user.avatar || ""}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            whileHover={{ scale: 1.05 }}
            className={`
              w-full flex items-center p-3 rounded-lg mb-2
              ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </motion.button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
