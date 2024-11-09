// src/components/BeginJourneyButton.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { toast } from "react-toastify";

const BeginJourneyButton = () => {
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      navigate("/create-story");
    } else {
      const confirmed = window.confirm(
        "To begin your storytelling journey, would you like to sign up or log in?"
      );

      if (confirmed) {
        navigate("/auth", {
          state: {
            redirectTo: "/create-story",
            message: "Sign up to unlock your storytelling potential!",
          },
        });
      } else {
        navigate("/explore");
        toast.info("Explore stories while you decide to join!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <motion.button
      onClick={handleBeginJourney}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#3B82F6",
        transition: { duration: 0.3 },
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
  );
};

export default BeginJourneyButton;
