// src/components/TestimonialCarousel.js
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

// Ensure you have installed react-slick and slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Emily Rodriguez",
    feedback:
      "Visual Storytelling has completely transformed my approach to capturing memories. The platform is intuitive and inspiring!",
    role: "Travel Photographer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Michael Chen",
    feedback:
      "As a professional content creator, I've found incredible value in the workshops and community support. Truly exceptional!",
    role: "Digital Content Creator",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Sophie Williams",
    feedback:
      "The platform has not only improved my storytelling skills but also connected me with amazing creative professionals worldwide.",
    role: "Freelance Journalist",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    rating: 5,
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex justify-center space-x-1 text-yellow-500 mb-4">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`
            ${index < rating ? "text-yellow-500" : "text-gray-300"}
            transition-colors duration-300 ease-in-out
          `}
        />
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    customPaging: (i) => (
      <div className="custom-dot bg-blue-50 rounded-full w-3 h-3 mt-4"></div>
    ),
    dotsClass: "slick-dots custom-dot-class",
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our <span className="text-blue-600">Community</span> Says
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from creators who have transformed their storytelling journey
            with our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border-4 border-blue-100">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 * index,
                  }}
                  className="px-8 py-12 text-center relative"
                >
                  {/* Quote Icons */}
                  <FaQuoteLeft className="absolute top-4 left-4 text-blue-100 text-4xl" />
                  <FaQuoteRight className="absolute bottom-4 right-4 text-blue-100 text-4xl" />

                  {/* Testimonial Content */}
                  <div className="flex flex-col items-center">
                    <motion.img
                      src={testimonial.image}
                      alt={testimonial.name}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 mb-6 shadow-xl hover:scale-105 transition-transform"
                    />

                    {/* Star Rating */}
                    <StarRating rating={testimonial.rating} />

                    {/* Feedback */}
                    <p className="text-lg italic text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                      "{testimonial.feedback}"
                    </p>

                    {/* Author Details */}
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-blue-600 font-medium text-lg">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
