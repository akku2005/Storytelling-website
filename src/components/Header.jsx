import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../assets/images/vs-high-resolution-logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        {/* Top Section with Logo and Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <img
              src={Logo}
              alt="Visual Storytelling Logo"
              className="h-12 w-12 rounded-full "
            />
            <Link to="/">
              <h1 className="text-3xl font-extrabold tracking-wide">
                Visual <span className="text-blue-400">Storytelling</span>
              </h1>
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a
              href="/"
              className="hover:text-blue-300 transition-colors duration-300 font-semibold"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-blue-300 transition-colors duration-300 font-semibold"
            >
              About
            </a>

            <a
              href="/contact"
              className="hover:text-blue-300 transition-colors duration-300 font-semibold"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-3 bg-gray-800 p-4 rounded-lg"
          >
            <a href="/" className="block text-center hover:text-blue-300">
              Home
            </a>
            <a href="/about" className="block text-center hover:text-blue-300">
              About
            </a>

            <a
              href="/contact"
              className="block text-center hover:text-blue-300"
            >
              Contact
            </a>
          </motion.div>
        )}

        {/* Hero Section */}
        <div className="text-center mt-8 space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300"
          >
            Discover Extraordinary Narratives
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            A Journey Through{" "}
            <span className="text-blue-400">Visual Storytelling</span>
          </motion.h2>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <a
              href="/explore-story"
              className="inline-block mt-6 px-8 py-3 bg-blue-500 text-white rounded-full 
              hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 
              shadow-lg hover:shadow-xl"
            >
              Explore Our Stories
            </a>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-8">
          {[
            {
              Icon: FaFacebook,
              color: "text-blue-600",
              link: "https://facebook.com",
            },
            {
              Icon: FaTwitter,
              color: "text-blue-400",
              link: "https://twitter.com",
            },
            {
              Icon: FaInstagram,
              color: "text-pink-500",
              link: "https://instagram.com",
            },
            {
              Icon: FaLinkedin,
              color: "text-blue-700",
              link: "https://linkedin.com",
            },
          ].map(({ Icon, color, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`${color} text-2xl hover:opacity-75 transition-all`}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
