// src/pages/Settings.jsx
import React, { useState } from "react";
import Layout from "../Layout";
import { motion } from "framer-motion";
import {
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
  FaUser,
  FaEnvelope,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    privacyMode: false,
    theme: "light",
    language: "English",
    emailNotifications: true,
  });

  const handleToggleSwitch = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast.success(`${key} setting updated`);
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
    toast.success(`Theme changed to ${theme}`);
  };

  const handleLanguageChange = (language) => {
    setSettings((prev) => ({
      ...prev,
      language,
    }));
    toast.success(`Language set to ${language}`);
  };

  return (
    <Layout title="Settings">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Notifications Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaBell className="text-2xl text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold">Notifications</h3>
                <p className="text-gray-500">
                  Manage your notification preferences
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSwitch("notifications")}
              className={`${
                settings.notifications ? "bg-green-500" : "bg-gray-300"
              } 
              text-white p-2 rounded-full`}
            >
              {settings.notifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaLock className="text-2xl text-purple-500" />
              <div>
                <h3 className="text-xl font-semibold">Privacy Mode</h3>
                <p className="text-gray-500">
                  Hide your profile from public view
                </p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSwitch("privacyMode")}
              className={`${
                settings.privacyMode ? "bg-green-500" : "bg-gray-300"
              } 
              text-white p-2 rounded-full`}
            >
              {settings.privacyMode ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FaPalette className="text-2xl text-orange-500" />
            <h3 className="text-xl font-semibold">Theme</h3>
          </div>
          <div className="flex space-x-4">
            {["light", "dark", "system"].map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`
                  capitalize px-4 py-2 rounded-lg 
                  ${
                    settings.theme === theme
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {theme}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center space-x-4 mb-4">
            <FaLanguage className="text-2xl text-teal-500" />
            <h3 className="text-xl font-semibold">Language</h3>
          </div>
          <div className="flex space-x-4">
            {["English", "Spanish", "French"].map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`
                  capitalize px-4 py-2 rounded-lg 
                  ${
                    settings.language === language
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {language}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Email Notifications */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl text-red-500" />
              <div>
                <h3 className="text-xl font-semibold">Email Notifications</h3>
                <p className="text-gray-500">Receive email updates</p>
              </div>
            </div>
            <button
              onClick={() => handleToggleSwitch("emailNotifications")}
              className={`${
                settings.emailNotifications ? "bg-green-500" : "bg-gray-300"
              } 
              text-white p-2 rounded-full`}
            >
              {settings.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Settings;
