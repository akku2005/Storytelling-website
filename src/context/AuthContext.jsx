// // src/context/AuthContext.jsx
// import React, { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check authentication on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("userToken");
//     if (token) {
//       // Validate token and set user
//       validateToken(token);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     localStorage.setItem("userToken", userData.token);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     localStorage.removeItem("userToken");
//   };

//   const validateToken = async (token) => {
//     try {
//       // Implement token validation logic
//       // This could be an API call to verify the token
//       const response = await fetch("/api/validate-token", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//         setIsAuthenticated(true);
//       } else {
//         logout();
//       }
//     } catch (error) {
//       console.error("Token validation failed", error);
//       logout();
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for using auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from "react";

// Mock user data
const DEFAULT_USER = {
  id: "1",
  name: "Akash Kumar",
  email: "akash@example.com",
  avatar: "",
  role: "Developer",
};

// Simulated authentication service
const authService = {
  login: async (credentials) => {
    const { email, password } = credentials;

    // Default bypass credentials
    const DEFAULT_EMAIL = "user@example.com";
    const DEFAULT_PASSWORD = "password123";

    // Check if credentials match default
    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      return DEFAULT_USER;
    }

    // Optional: Add fallback for other credentials or throw error
    throw new Error("Invalid credentials");
  },
};

// Create AuthContext
const AuthContext = createContext(null);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication on initial load
  useEffect(() => {
    // Check if user was previously logged in (e.g., in local storage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        // Clear invalid stored user
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login method
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Attempt login
      const userData = await authService.login(credentials);

      // Store user in local storage
      localStorage.setItem("user", JSON.stringify(userData));

      // Set user and authentication state
      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error) {
      // Handle login failure
      setIsAuthenticated(false);
      setError(error.message || "Login failed");

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  // Update user profile
  const updateProfile = (updatedUser) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedUser,
    }));
    // Optionally update local storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...updatedUser,
      })
    );
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
