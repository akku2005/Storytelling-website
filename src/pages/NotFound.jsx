// src/pages/NotFound.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaSearch, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [isSearching, setIsSearching] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4 py-8 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden border-4 border-indigo-100"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-purple-200 rounded-full opacity-10"
          />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-200 rounded-full opacity-10"
          />
        </div>

        {/* 404 Illustration */}
        <motion.div variants={itemVariants} className="mb-8 relative">
          <FaRobot className="mx-auto text-9xl text-indigo-500 mb-4 animate-bounce" />
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
            404
          </h2>
          <div className="absolute inset-0 bg-indigo-500/10 -z-10 blur-2xl" />
        </motion.div>

        {/* Content */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold mb-4 text-gray-800"
        >
          Oops! Lost in the Digital Maze
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 mb-8 max-w-xl mx-auto"
        >
          The page you're searching for seems to have taken an unexpected
          detour. Don't worry, our digital compass is ready to guide you back!
        </motion.p>

        {/* Search Section */}
        {isSearching ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-8"
          >
            <input
              type="text"
              placeholder="Search pages..."
              className="w-full max-w-md px-4 py-3 rounded-full border-2 border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 bg-indigo-500 text-white p-3 rounded-full"
            >
              <FaSearch />
            </motion.button>
          </motion.div>
        ) : null}

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition"
          >
            <Link to="/" className="flex items-center">
              <FaHome className="mr-2" /> Go Home
            </Link>
          </motion.button>

          <motion.button
            onClick={() => setIsSearching(!isSearching)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition"
          >
            <FaSearch className="mr-2" />
            {isSearching ? "Cancel" : "Search"}
          </motion.button>
        </motion.div>

        {/* Animated Background Particles */}
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="absolute w-2 h-2 bg-indigo-200 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default NotFound;
