// // src/components/PrivateRoute.jsx
// import React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Layout from "./Layout";
// import Loader from "./Loader"; // Create a simple loading component

// const PrivateRoute = () => {
//   const { isAuthenticated, isLoading, user } = useAuth();
//   const location = useLocation();

//   // Show loader while checking authentication
//   if (isLoading) {
//     return <Loader />;
//   }

//   // If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     return <Navigate to="/auth" state={{ from: location }} replace />;
//   }

//   // If authenticated, render the layout with child routes
//   return (
//     <Layout userProfile={user}>
//       <Outlet />
//     </Layout>
//   );
// };

// export default PrivateRoute;

const PrivateRoute = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    console.log("Not authenticated, redirecting to auth"); // Debug log
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
