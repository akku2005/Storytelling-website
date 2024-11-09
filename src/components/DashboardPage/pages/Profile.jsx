// src/pages/Profile.jsx
import React, { useState, useRef } from "react";
import Layout from "../Layout";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaEdit,
  FaCamera,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Akash",
    email: "akash@gmail.com",
    bio: "Passionate storyteller and creative writer.",
    joinDate: "November 15, 2024",
    avatar: "",
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File type validation
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image.");
        return;
      }

      // File size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB.");
        return;
      }

      // Create a file reader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
        toast.success("Profile picture updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <Layout title="Profile">
      <motion.div className="grid md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="flex items-center mb-4 relative">
            <div className="relative">
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 mr-6 object-cover"
              />
              {isEditing && (
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-6 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <FaCamera />
                </button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
              />
            </div>
            <div className="flex-grow">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 w-full mb-2"
                  placeholder="Enter your name"
                />
              ) : (
                <h4 className="font-bold text-xl">{userData.name}</h4>
              )}
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 w-full"
                    placeholder="Enter your email"
                  />
                ) : (
                  <h4 className="font-bold">{userData.email}</h4>
                )}
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <span>Joined: {userData.joinDate}</span>
              </div>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="border rounded-lg p-2 w-full mb-4"
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              ) : (
                <p className="text-gray-700">{userData.bio}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            {isEditing && (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mr-2"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-blue-500 hover:underline"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-3">
            {[
              { action: "Created a new story", title: '"My Journey"' },
              { action: "Commented on", title: '"The Art of Storytelling"' },
              { action: "Liked", title: '"Adventures in Writing"' },
              { action: "Shared a post about", title: "creative writing tips" },
            ].map((activity, index) => (
              <li
                key={index}
                className="bg-gray-100 p-3 rounded-lg flex items-center"
              >
                <div className="mr-3 text-blue-500">
                  <FaEdit />
                </div>
                <span>
                  {activity.action} {activity.title}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-gray-500 mt-4 text-center">
            No more recent activities available
          </p>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Profile;
