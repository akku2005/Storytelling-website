// src/components/NewsletterSignup.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    // Here you would typically send the email to your server or API
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");
    setIsValidEmail(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  const inputVariants = {
    initial: {
      borderColor: "#E5E7EB",
      boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
    },
    focus: {
      borderColor: "#3B82F6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
    },
    invalid: {
      borderColor: "#EF4444",
      boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.3)",
    },
  };

  return (
    <div className="bg-gradient-to-br from-blue-50  min-h-[400px] flex items-center justify-center p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 text-center">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center space-y-4"
            >
              <FaCheckCircle className="text-6xl text-green-500" />
              <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
              <p className="text-gray-600">
                You've successfully subscribed to our newsletter.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                <FaEnvelope className="text-5xl text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Stay Updated
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest stories, tips, and
                exclusive content.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  variants={inputVariants}
                  initial="initial"
                  whileFocus="focus"
                  animate={!isValidEmail ? "invalid" : "initial"}
                  className="relative"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(true);
                    }}
                    placeholder="Enter your email address"
                    className={`w-full p-3 pl-10 rounded-lg border-2 text-gray-800 focus:outline-none 
                      ${!isValidEmail ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>

                {!isValidEmail && (
                  <p className="text-red-500 text-sm">
                    Please enter a valid email address.
                  </p>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center space-x-2 
                    hover:bg-blue-600 transition-colors duration-300"
                >
                  <FaPaperPlane />
                  <span>Subscribe Now</span>
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NewsletterSignup;
