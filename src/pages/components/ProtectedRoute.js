// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  // Get the token and user data from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // 1. Check if the user is logged in at all
  if (!token) {
    // If not logged in, redirect to the login page
    return <Navigate to="/" replace />;
  }

  // 2. Check if the route requires a specific role and if the user has that role
  // The 'allowedRoles' prop is an array of roles that can access the route.
  if (allowedRoles && !allowedRoles.some(role => role.toLowerCase() === userRole?.toLowerCase())) {
    // If the user's role is not in the allowed list, redirect them to a "not authorized" page or back to a safe dashboard.
    // For simplicity, we'll redirect to the login page.
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the component the user was trying to access
  return <Outlet />;
};

export default ProtectedRoute;