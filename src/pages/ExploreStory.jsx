import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StorySection from "../components/StorySection";
import Header from "../components/Header";

const ExploreStory = () => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "Capturing Love: A Wedding Story",
      content:
        "A beautiful journey of two souls coming together, captured through the lens of emotion and artistry.",
      image: "https://images.unsplash.com/photo-1519741497674-611481e1f8e3",
      videoUrl: "https://www.youtube.com/watch?v=7QU1nvZDQ2c", // Wedding video
      author: "Emma Rodriguez",
      date: "June 15, 2023",
      readTime: 8,
      category: "Wedding",
    },
    {
      id: 2,
      title: "Urban Landscapes: Cityscapes Unveiled",
      content:
        "An exploration of urban beauty, revealing the hidden narratives of city life through breathtaking photography.",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      videoUrl: "https://www.youtube.com/watch?v=qKxfWd79HFI", // City landscape video
      author: "Michael Chen",
      date: "May 22, 2023",
      readTime: 6,
      category: "Landscape",
    },
    {
      id: 3,
      title: "Nature's Whispers: Wild Encounters",
      content:
        "A visual narrative of raw, untamed beauty - capturing the essence of wildlife in its most authentic moments.",
      image: "https://images.unsplash.com/photo-1547234935-80c7145ec969",
      videoUrl: "https://www.youtube.com/watch?v=TvHpSZSaRMc", // Wildlife video
      author: "Sophia Kim",
      date: "July 1, 2023",
      readTime: 12,
      category: "Wildlife",
    },
    {
      id: 4,
      title: "Sunset Serenity: Coastal Memories",
      content:
        "A mesmerizing journey through golden hours and ocean horizons, capturing the tranquil beauty of coastal landscapes.",
      image: "https://images.unsplash.com/photo-1506929562872-0e1854eb3b92",
      videoUrl: "https://www.youtube.com/watch?v=Y2VF9Ys1SYo", // Sunset landscape video
      author: "Alex Thompson",
      date: "August 10, 2023",
      readTime: 7,
      category: "Landscape",
    },
    {
      id: 5,
      title: "Love in the City: Urban Romance",
      content:
        "A heartwarming story of love unfolding against the backdrop of bustling city streets and architectural marvels.",
      image:
        "https://images.unsplash.com/photo-1513759565286-20e9c1a4sharing-photos-of-love-and-romance-in-the-city-RKVoqvzJK9Q-unsplash.jpg",
      videoUrl: "https://www.youtube.com/watch?v=3atJ4j0AFwc", // Urban romance video
      author: "Olivia Martinez",
      date: "September 5, 2023",
      readTime: 9,
      category: "Wedding",
    },
    {
      id: 6,
      title: "Wild Safari: African Wilderness",
      content:
        "An epic exploration of African wildlife, capturing the raw beauty and untamed spirit of nature's most magnificent creatures.",
      image: "https://images.unsplash.com/photo-1547720074-e65f7b5c0a7d",
      videoUrl: "https://www.youtube.com/watch?v=7NKmgIxOp0Q", // Wildlife safari video
      author: "David Nguyen",
      date: "October 20, 2023",
      readTime: 11,
      category: "Wildlife",
    },
  ]);

  const [filteredStories, setFilteredStories] = useState(stories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Search and Filter Logic
  useEffect(() => {
    let result = stories;

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((story) => story.category === selectedCategory);
    }

    // Search Filter
    if (searchTerm) {
      result = result.filter(
        (story) =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStories(result);
  }, [searchTerm, selectedCategory, stories]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 3;
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(
    indexOfFirstStory,
    indexOfLastStory
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = ["All", "Wedding", "Landscape", "Wildlife"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Explore <span className="text-blue-600">Our Stories</span>
        </motion.h1>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12 max-w-2xl mx-auto"
        >
          <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden mb-6">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 text-gray-700 focus:outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full shadow-md transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="space-y-12">
          {currentStories.length > 0 ? (
            currentStories.map((story) => (
              <StorySection
                key={story.id}
                title={story.title}
                content={story.content}
                image={story.image}
                videoUrl={story.videoUrl}
                author={story.author}
                date={story.date}
                readTime={story.readTime}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 text-xl ">
              No stories found.
            </div>
          )}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center space-x-4 mt-12"
        >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-6 py-3 bg-white shadow-md rounded-full hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastStory >= filteredStories.length}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExploreStory;
