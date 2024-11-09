import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBookOpen,
  FaClock,
  FaQuoteLeft,
  FaShareAlt,
  FaPrint,
} from "react-icons/fa";

const StoryDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        // Normalize the title (convert to lowercase and replace spaces/hyphens)
        const normalizedTitle = title.toLowerCase().replace(/[-\s]/g, "-");

        // Define the possible file paths
        const possiblePaths = [
          `/src/assets/stories/${normalizedTitle}.json`,
          `/src/assets/stories/${title}.json`,
        ];

        let data = null;

        // Try multiple paths
        for (const path of possiblePaths) {
          try {
            const response = await fetch(path);

            // Check if the response is OK
            if (!response.ok) {
              continue; // Try next path
            }

            // Parse JSON
            data = await response.json();
            break;
          } catch (pathError) {
            console.log(`Error fetching ${path}:`, pathError);
            continue;
          }
        }

        if (!data) {
          throw new Error("Story data not found");
        }

        setStoryData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchStoryData();
  }, [title]);

  // Calculate estimated reading time
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text ? text.trim().split(/\s+/).length : 0;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Generate excerpt
  const generateExcerpt = (text, maxLength = 200) => {
    if (!text) return "No excerpt available";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Render sections with fallback
  const renderSection = (title, items, renderItem) => {
    if (!items || items.length === 0) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </motion.div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // Error State
  if (error || !storyData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            Oops! Story Not Found
          </h2>
          <p className="text-gray-600">{error || "Unable to load story"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation and Actions */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaArrowLeft />
            <span>Back</span>
          </motion.button>

          <div className="flex space-x-4">
            {[
              { Icon: FaShareAlt, color: "text-blue-500" },
              { Icon: FaPrint, color: "text-gray-700" },
            ].map(({ Icon, color }, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-white shadow-md p-3 rounded-full hover:bg-gray-100 ${color}`}
              >
                <Icon />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {storyData.title || title.replace(/-/g, " ")}
          </h1>

          {/* Story Metadata */}
          <div className="flex items-center space-x-4 text-gray-600 mb-4">
            <div className="flex items-center space-x-2">
              <FaBookOpen />
              <span>{storyData.category || "Story"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock />
              <span>
                {calculateReadingTime(
                  storyData.content ||
                    storyData.summary ||
                    storyData.description
                )}{" "}
                min read
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-gray-500 italic">
            <FaQuoteLeft className="inline-block mr-2 text-blue-500" />
            {storyData.summary ||
              storyData.description ||
              generateExcerpt(storyData.content)}
          </p>
        </motion.div>

        {/* Key Concepts */}
        {renderSection(
          "Key Concepts",
          storyData.key_concepts,
          (concept, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800  px-3 py-1 rounded-full text-sm"
            >
              {concept}
            </span>
          )
        )}

        {/* Main Points */}
        {renderSection("Main Points", storyData.main_points, (point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-gray-700 list-disc list-inside"
          >
            {point}
          </motion.li>
        ))}
        {storyData.full_story && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Full Story
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {storyData.full_story}
            </p>
          </motion.div>
        )}

        {/* Quotes */}
        {renderSection("Quotes", storyData.quotes, (quote, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="italic text-gray-700"
          >
            {quote}
          </motion.li>
        ))}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <button
            className="bg-blue-500 text-white px-8 py-3 rounded-full 
            hover:bg-blue-600 transition-colors shadow-lg flex items-center 
            justify-center space-x-2 mx-auto"
          >
            <FaShareAlt />
            <span>Share this Story</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryDetail;
