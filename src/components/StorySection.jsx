import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaShareAlt, FaExpand } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StorySection = ({
  title,
  content,
  image,
  videoUrl,
  author,
  date,
  readTime,
}) => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const extractVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = extractVideoId(videoUrl);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg my-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {title.split(" ").map((word, index) =>
                index === title.split(" ").length - 1 ? (
                  <span key={index} className="text-blue-400">
                    {word}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
          </motion.div>

          <div className="flex space-x-4">
            {[
              { Icon: FaHeart, color: "text-red-500" },
              { Icon: FaShareAlt, color: "text-blue-400" },
            ].map(({ Icon, color }, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`bg-white/20 p-3 rounded-full hover:bg-white/30 ${color}`}
              >
                <Icon className="text-white" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mb-4 flex items-center text-sm text-gray-300">
              <span className="font-semibold">{author}</span>
              <span className="mx-2">•</span>
              <span>{date}</span>
              <span className="ml-auto bg-blue-500 px-3 py-1 rounded-full">
                {readTime} min read
              </span>
            </div>

            <p className="text-gray-200 leading-relaxed mb-6">{content}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                navigate(`/story/${title.replace(/\s+/g, "-").toLowerCase()}`, {
                  state: { content: content },
                })
              }
              className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors mt-6"
            >
              <FaExpand />
              <span>Read Full Story</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative w-full h-[400px]"
          >
            {isVideoPlaying && videoId ? (
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1`}
                  title="Story Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover rounded-2xl"
                ></iframe>
              </div>
            ) : (
              image && (
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain bg-white"
                  />
                  {videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsVideoPlaying(true)}
                        className="bg-white/80 p-4 rounded-full"
                      >
                        <FaPlay className="text-blue-600 text-2xl" />
                      </motion.button>
                    </div>
                  )}
                </div>
              )
            )}
          </motion.div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center space-x-2">
          {["Visual Story", "Photography", "Narrative"].map((tag, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-white/20 text-white px-4 py-2 rounded-full text-sm m-1"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

StorySection.defaultProps = {
  title: "Capturing Moments: A Visual Journey",
  content:
    "Explore the intricate details of storytelling through powerful visuals and compelling narratives that transcend ordinary experiences.",
  image: "/path/to/default-image.jpg",
  videoUrl: "",
  author: "Visual Storyteller",
  date: "May 15, 2023",
  readTime: 10,
};

export default StorySection;
