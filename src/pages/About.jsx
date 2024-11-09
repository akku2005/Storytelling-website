import React from "react";
import { motion } from "framer-motion";
import { FaCamera, FaVideo, FaPalette, FaGlobeAmericas } from "react-icons/fa";
import Header from "../components/Header";

const About = () => {
  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const teamMembers = [
    {
      name: "Emma Rodriguez",
      role: "Lead Photographer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sophia Kim",
      role: "Video Editor",
      image: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
      name: "Alex Thompson",
      role: "Cinematographer",
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
  ];

  const features = [
    {
      icon: <FaCamera className="text-emerald-500 text-4xl mb-4" />,
      title: "Professional Photography",
      description:
        "Capturing moments with precision, creativity, and artistic vision that tells your unique story.",
    },
    {
      icon: <FaVideo className="text-indigo-500 text-4xl mb-4" />,
      title: "Cinematic Videography",
      description:
        "Creating compelling visual narratives that bring your stories to life with stunning cinematography.",
    },
    {
      icon: <FaPalette className="text-purple-500 text-4xl mb-4" />,
      title: "Creative Editing",
      description:
        "Transforming raw footage into masterpieces through innovative post-production techniques.",
    },
    {
      icon: <FaGlobeAmericas className="text-cyan-500 text-4xl mb-4" />,
      title: "Global Storytelling",
      description:
        "Connecting cultures and emotions through powerful visual storytelling across various mediums.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-emerald-600">Visual Storytelling</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate visual artists dedicated to transforming moments
            into timeless memories through innovative storytelling and
            cutting-edge visual techniques.
          </p>
        </motion.div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center mt-16 bg-emerald-50 p-12 rounded-xl"
        >
          <h2 className="text-3xl font-bold mb-6">
            Our <span className="text-emerald-600">Story</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Founded by a team of creative professionals, Visual Storytelling
            emerged from a shared passion for capturing and creating
            extraordinary visual experiences. We believe every moment has a
            story waiting to be told, and we're committed to bringing those
            stories to life with creativity, technical excellence, and emotional
            depth.
          </p>
        </motion.div>

        {/* Team Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">
            Meet Our <span className="text-emerald-600">Creative Team</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg w-64 transform transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-emerald-500"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Visual Storytelling. All Rights Reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default About;
