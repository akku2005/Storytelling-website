// src/pages/Dashboard.jsx
import React from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { FaBook, FaEye, FaHeart, FaComment } from "react-icons/fa";

const Dashboard = () => {
  const statsData = [
    {
      icon: <FaBook className="text-blue-500" />,
      title: "Total Stories",
      value: 5,
    },
    {
      icon: <FaEye className="text-green-500" />,
      title: "Total Views",
      value: "3,456",
    },
    {
      icon: <FaHeart className="text-red-500" />,
      title: "Total Likes",
      value: 254,
    },
    {
      icon: <FaComment className="text-purple-500" />,
      title: "Total Comments",
      value: 78,
    },
  ];

  return (
    <Layout title="Dashboard">
      <motion.div className="grid md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-4 rounded-lg shadow-md flex items-center"
            >
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Stories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Stories</h3>
          {/* Placeholder for recent stories */}
          <p>No recent stories available.</p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
