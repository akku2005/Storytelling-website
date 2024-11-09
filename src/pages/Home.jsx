import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaCamera,
  FaGlobe,
  FaBook,
  FaRocket,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";

import Image from "../constants/images";
import Header from "../components/Header";
import StorySection from "../components/StorySection";
import ImageGallery from "../components/ImageGallery";
import VideoPlayer from "../components/VideoPlayer";
import TestimonialCarousel from "../components/TestimonialCarousel";
import NewsletterSignup from "../components/NewsletterSignup";
import MindImage from "../assets/images/PowerofyourSubconsciousMind.png";
import AtomicImage from "../assets/images/Atomic-Habits.jpeg";

// Utilities
import { pageVariants, pageTransition } from "../utils/animations";
import { trackEvent } from "../utils/analytics";

import BeginJourneyButton from "../components/BeginJourneyButton";
const Home = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  // Data Constants
  const images = [
    Image.dream,
    Image.descipline,
    Image.future,
    Image.goal,
    Image.problem,
  ];

  const storySections = [
    {
      title: "The Beginning of Our Journey",
      content:
        "As you sow in your subconscious mind, so shall you reap in your body and environment.",
      image: MindImage,
      author: "Visual Storytellers",
      date: "June 15, 2023",
      readTime: 34.15,
      videoUrl: "https://www.youtube.com/watch?v=BLEYCyrLpkI&t=268s",
      id: 1,
    },
    {
      title: "Atomic Habits",
      content:
        "The fundamentals: Why tiny changes make a big difference; The 1st law: Make it obvious; The 2nd law: Make it attractive; The 3rd law: ...",
      image: AtomicImage,
      author: "Adventure Team",
      date: "July 1, 2023",
      readTime: 5,
    },
  ];

  const featuredServices = [
    {
      icon: FaCamera,
      title: "Professional Photography",
      description:
        "Capture moments that last a lifetime with our expert photographers.",
      color: "text-blue-500",
    },
    {
      icon: FaGlobe,
      title: "Global Storytelling",
      description:
        "Connecting stories from around the world, bridging cultures and experiences.",
      color: "text-green-500",
    },
    {
      icon: FaBook,
      title: "Narrative Workshops",
      description:
        "Learn the art of storytelling through our immersive workshops.",
      color: "text-purple-500",
    },
  ];

  // Animation Variants
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-pattern"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Unleash the Power of <br />
              <span className="text-yellow-300">Visual Storytelling</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-200">
              Transform ordinary moments into extraordinary narratives.
              Discover, create, and share stories that inspire and connect.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/explore-story"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold 
                hover:bg-blue-100 transition-colors shadow-lg flex items-center"
              >
                <FaPlay className="mr-2" /> Explore Stories
              </Link>
              <Link
                to="/create"
                className="bg-transparent border-2 border-white text-white px-8 py-3 
                rounded-full hover:bg-white hover:text-blue-600 transition-colors flex items-center"
              >
                Create Your Story
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Featured Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <service.icon
                  className={`mx-auto text-6xl mb-4 ${service.color}`}
                />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="relative overflow-hidden text-center mt-16 bg-gradient-to-r from-blue-500 to-purple-600 py-16 rounded-xl shadow-md"
        >
          {/* Decorative Elements */}
          {motion}
          <div className="absolute inset-0 overflow-hidden">
            {/* Rotated Blue Background with Animation */}
            <motion.div
              className="absolute inset-0 bg-blue-300 opacity-30 rounded-xl transform -rotate-12 -translate-x-8 -translate-y-8 blur-md"
              initial={{ scale: 1.2 }}
              animate={{
                scale: [1.2, 1.1, 1.2],
                rotate: [0, -12, 0],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute bottom-0 right-0 w-7 h-7 bg-purple-300 opacity-40 rounded-full transform translate-x-16 translate-y-16"
              initial={{ y: 0, scale: 1 }}
              animate={{
                y: [0, -100, 0],
                scale: [1, 44, 1],
                rotate: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.div
              className="absolute bottom-0 right-0 w-7 h-7 bg-purple-300 opacity-40 rounded-full transform translate-x-16 translate-y-16"
              initial={{ y: 0, scale: 1 }}
              animate={{
                y: [0, -100, 0],
                scale: [1, 11, 1],
                rotate: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="absolute top-0 left-0 w-7 h-7 bg-purple-300 opacity-40 rounded-full transform translate-x-4 translate-y-4"
              initial={{ y: 0, scale: 1 }}
              animate={{
                y: [0, -100, 0],
                scale: [1, 22, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>
            <motion.div
              className="absolute top-0 left-0 w-7 h-7 bg-purple-300 opacity-40 rounded-full transform translate-x-4 translate-y-4"
              initial={{ y: 0, scale: 1 }}
              animate={{
                y: [0, -100, 0],
                scale: [1, 44, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            ></motion.div>
          </div>
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <FaRocket className="text-6xl text-white mx-auto mb-4 animate-bounce" />
            </motion.div>

            <h3 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg">
              Ready to Start Your Story?
            </h3>

            <div className="flex justify-center items-center w-full mt-2">
              <motion.button
                onClick={() => {
                  // Check if user is authenticated
                  const userToken = localStorage.getItem("userToken");

                  if (userToken) {
                    // If user is logged in, navigate to create story page
                    navigate("/create-story");
                  } else {
                    // If not logged in, show authentication options
                    const confirmed = window.confirm(
                      "To begin your storytelling journey, would you like to sign up or log in?"
                    );

                    if (confirmed) {
                      // Redirect to authentication page
                      navigate("/auth", {
                        state: {
                          redirectTo: "/create-story",
                          message:
                            "Sign up to unlock your storytelling potential!",
                        },
                      });
                    } else {
                      // Optional: Navigate to explore page or show a message
                      navigate("/explore");

                      // Optional: Show a toast notification
                      toast.info("Explore stories while you decide to join!", {
                        position: "bottom-right",
                        autoClose: 3000,
                      });
                    }
                  }

                  // Track the button click event
                  trackEvent("begin_journey_click", {
                    action: userToken
                      ? "create_story"
                      : "authentication_prompt",
                  });
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3B82F6",
                  color: "white", // Optional: change text color on hover
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className="bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-semibold 
    shadow-lg hover:bg-blue-100 transition-colors duration-300 
    flex items-center justify-center group"
              >
                <span className="mr-2 group-hover:text-white transition-colors">
                  Begin Your Journey
                </span>
                <FaChevronRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <VideoPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            title="Our Visual Journey Highlights"
          />
        </motion.div>

        {/* Story Sections */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Inspiring <span className="text-blue-500">Stories</span>
          </h2>
          {storySections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.2 }}
            >
              <StorySection
                {...section}
                onReadMore={() => setActiveSection(index)}
              />
            </motion.div>
          ))}
        </section>

        {/* Image Gallery */}
        <section
          id="gallery"
          className="flex justify-center items-center min-h-screen mb-16"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Our Visual <span className="text-blue-500">Collection</span>
            </h2>
            <ImageGallery images={images} />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <TestimonialCarousel />
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Stay Updated with Our{" "}
            <span className="text-blue-500">Newsletter</span>
          </h2>
          <NewsletterSignup />
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Visual Storytelling. All Rights Reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
