import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCamera,
  FaVideo,
  FaUpload,
  FaSave,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import Header from "../components/Header";

// Constants
const STORY_TYPES = [
  {
    name: "Photography",
    icon: <FaCamera className="text-3xl text-blue-500" />,
  },
  {
    name: "Videography",
    icon: <FaVideo className="text-3xl text-green-500" />,
  },
];

const MAX_TAGS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const Create = () => {
  // State Management
  const [storyType, setStoryType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  // File Upload Handler
  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= MAX_FILE_SIZE;
      const isValidType =
        file.type.startsWith("image/") || file.type.startsWith("video/");

      if (!isValidSize) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return false;
      }

      if (!isValidType) {
        toast.error(`${file.name} is not a valid image or video`);
        return false;
      }

      return true;
    });

    setMediaFiles((prev) => [...prev, ...validFiles]);
  }, []);

  // Tag Management
  const addTag = useCallback(() => {
    const trimmedTag = newTag.trim();

    if (!trimmedTag) {
      toast.error("Tag cannot be empty");
      return;
    }

    if (tags.includes(trimmedTag)) {
      toast.error("This tag already exists");
      return;
    }

    if (tags.length >= MAX_TAGS) {
      toast.error(`Maximum ${MAX_TAGS} tags allowed`);
      return;
    }

    setTags((prev) => [...prev, trimmedTag]);
    setNewTag("");
  }, [newTag, tags]);

  // Form Validation
  const validateForm = useCallback(() => {
    if (!storyType) {
      toast.error("Please select a story type");
      return false;
    }

    if (title.trim().length < 5) {
      toast.error("Title must be at least 5 characters");
      return false;
    }

    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters");
      return false;
    }

    if (mediaFiles.length === 0) {
      toast.error("Please upload at least one media file");
      return false;
    }

    return true;
  }, [storyType, title, description, mediaFiles]);

  // Form Submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
        const storyData = {
          type: storyType,
          title: title.trim(),
          description: description.trim(),
          tags,
          media: mediaFiles,
        };

        // Simulated API call
        console.log("Story Data:", storyData);

        // Success Notification
        toast.success(" Story uploaded successfully and going for review!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Reset Form
        setTimeout(() => {
          setStoryType("");
          setTitle("");
          setDescription("");
          setTags([]);
          setMediaFiles([]);
        }, 3500);
      } catch (error) {
        toast.error("Failed to upload story. Please try again.");
      }
    },
    [storyType, title, description, tags, mediaFiles, validateForm]
  );

  // Render Methods
  const renderStoryTypeSelection = () => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Choose Story Type</h2>
      <div className="flex justify-center space-x-6">
        {STORY_TYPES.map((type) => (
          <motion.button
            key={type.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStoryType(type.name)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 w-40 ${
              storyType === type.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            {type.icon}
            <span className="mt-2">{type.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderMediaUpload = () => (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">Upload Media</label>
      <div className="flex items-center">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="hidden"
          id="media-upload"
        />
        <label
          htmlFor="media-upload"
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
        >
          <FaUpload className="mr-2" /> Upload Files
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {mediaFiles.map((file, index) => (
          <div
            key={index}
            className="relative w-20 h-20 rounded-lg overflow-hidden"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={`Upload ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => {
                const newFiles = [...mediaFiles];
                newFiles.splice(index, 1);
                setMediaFiles(newFiles);
              }}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Create Your <span className="text-blue-500">Story</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8"
        >
          {renderStoryTypeSelection()}
          {renderMediaUpload()}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter story title"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter story description"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tags</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  <FaPlus />
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                    {tag}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="ml-2 text-red-500"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaSave className="mr-2 inline" /> Save Story
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Create;
