// src/components/Header.jsx
import React, { useState } from "react";
import { FaBars, FaBell, FaSearch, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ toggleSidebar, title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      {/* Mobile Layout */}
      <div className="flex items-center w-full">
        {/* Sidebar Toggle */}
        <button onClick={toggleSidebar} className="md:hidden mr-4">
          <FaBars className="text-2xl" />
        </button>

        {/* Page Title */}
        <h1 className="text-xl md:text-2xl font-bold flex-grow">{title}</h1>

        {/* Mobile Search and Notification Icons */}
        <div className="flex items-center space-x-3">
          {/* Search Toggle for Mobile */}
          <button onClick={toggleSearch} className="md:hidden">
            {isSearchVisible ? <FaTimes /> : <FaSearch />}
          </button>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-full pr-10 w-64"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        <button className="relative">
          <FaBell className="text-2xl text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            3
          </span>
        </button>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg z-50 p-4 md:hidden"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-full pr-10"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
