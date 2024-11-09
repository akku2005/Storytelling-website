// src/pages/MyStory.jsx
import React, { useState } from "react";
import Layout from "../Layout";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaBook,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// Mock data for stories
const initialStories = [
  {
    id: 1,
    title: "My First Adventure",
    description: "A journey through the unknown landscapes of my life.",
    genre: "Autobiography",
    createdAt: "2024-01-15",
    status: "Draft",
  },
  {
    id: 2,
    title: "Echoes of Silence",
    description: "A profound exploration of inner thoughts and emotions.",
    genre: "Personal Essay",
    createdAt: "2024-02-20",
    status: "Published",
  },
  {
    id: 3,
    title: "Dreams and Reality",
    description: "Blending imagination with real-life experiences.",
    genre: "Memoir",
    createdAt: "2024-03-10",
    status: "In Progress",
  },
];

const MyStory = () => {
  const [stories, setStories] = useState(initialStories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);

  // Search functionality
  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete story handler
  const handleDeleteStory = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this story?"
    );
    if (confirmDelete) {
      setStories(stories.filter((story) => story.id !== id));
      toast.success("Story deleted successfully!");
    }
  };

  // Create new story handler
  const handleCreateStory = () => {
    const newStory = {
      id: stories.length + 1,
      title: "Untitled Story",
      description: "Start writing your story...",
      genre: "Unspecified",
      createdAt: new Date().toISOString().split("T")[0],
      status: "Draft",
    };
    setStories([...stories, newStory]);
    toast.success("New story created!");
  };

  // View story details
  const handleViewStory = (story) => {
    setSelectedStory(story);
  };

  return (
    <Layout title="My Stories">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <FaBook className="text-3xl text-blue-500" />
            <h1 className="text-2xl font-bold">My Stories</h1>
          </div>
          <button
            onClick={handleCreateStory}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPlus />
            <span>Create New Story</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search stories by title or genre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white border rounded-lg p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{story.title}</h2>
                <span
                  className={`
                    px-3 py-1 rounded-full text-sm 
                    ${
                      story.status === "Draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : story.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  `}
                >
                  {story.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{story.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {story.genre} | {story.createdAt}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewStory(story)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteStory(story.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Stories Placeholder */}
        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              You haven't created any stories yet.
            </p>
            <button
              onClick={handleCreateStory}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Create Your First Story
            </button>
          </div>
        )}

        {/* Story Details Modal (Optional) */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedStory.title}</h2>
              <p className="mb-4">{selectedStory.description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default MyStory;
