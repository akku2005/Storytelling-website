import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Header from "../components/Header";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
    console.log(formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      service: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-emerald-500 text-3xl" />,
      title: "Email",
      content: "asakashsahu20@gmail.com ",
    },
    {
      icon: <FaPhone className="text-emerald-500 text-3xl" />,
      title: "Phone",
      content: "+91 7420987728",
    },
    {
      icon: <FaMapMarkerAlt className="text-emerald-500 text-3xl" />,
      title: "Location",
      content: "Bhubaneswar, Odisha, INDIA",
    },
  ];

  const serviceOptions = [
    "Wedding Photography",
    "Corporate Videography",
    "Event Storytelling",
    "Portrait Sessions",
    "Commercial Shoots",
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
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12"
        >
          Contact <span className="text-emerald-600">Visual Storytelling</span>
        </motion.h1>

        {/* Contact Container */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">Connect With Us</h2>

            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center mb-5 p-4 bg-emerald-50 rounded-lg"
              >
                <div className="mr-4">{info.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Follow Our Journey</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Start Your Visual Story
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700 mb-2">
                  Service of Interest
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select a Service</option>
                  {serviceOptions.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Tell Us Your Story
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Share the details of your project or vision"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-300 flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" /> Send Your Story
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Visual Storytelling. All Rights Reserved.</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Contact;
