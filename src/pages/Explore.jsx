import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100"
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Explore <span className="text-blue-500">Stories</span>
        </h1>
        {/* Add content for explore page */}
      </div>
    </motion.div>
  );
};

export default Explore;
