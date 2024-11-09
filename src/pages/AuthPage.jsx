import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "user@example.com",
    password: "password123",
    username: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // At least 8 characters
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        await login({
          email: formData.email,
          password: formData.password,
        });

        toast.success("Login Successful!", {
          position: "top-right",
          duration: 2000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
        });

        // Delayed navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // Signup Logic
        if (!formData.username) {
          toast.error("Username is required", {
            position: "top-right",
          });
          return;
        }

        if (!validateEmail(formData.email)) {
          toast.error("Invalid Email Format", {
            position: "top-right",
          });
          return;
        }

        if (!validatePassword(formData.password)) {
          toast.error("Password must be at least 8 characters long", {
            position: "top-right",
            duration: 4000,
          });
          return;
        }

        // Simulate signup (replace with actual signup logic)
        toast.success("Account Created Successfully!", {
          position: "top-right",
          duration: 2000,
        });

        // Switch to login after successful signup
        setIsLogin(true);
      }
    } catch (error) {
      toast.error(error.message || "Authentication failed", {
        position: "top-right",
        style: {
          background: "#FF5722",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const socialAuthButtons = [
    {
      icon: FaGoogle,
      color: "text-red-500",
      provider: "Google",
    },
    {
      icon: FaFacebook,
      color: "text-blue-600",
      provider: "Facebook",
    },
    {
      icon: FaGithub,
      color: "text-gray-800",
      provider: "GitHub",
    },
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    toast.success(`Logging in with ${provider}`, {
      position: "top-right",
    });
    // Implement social login logic
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin
                ? "Sign in to continue your storytelling journey"
                : "Join our creative community today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>

            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-4 text-gray-500">Or continue with</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              {socialAuthButtons.map((button, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${button.color} text-2xl p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all`}
                  onClick={() => handleSocialLogin(button.provider)}
                >
                  <button.icon />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AuthPage;
