// src/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 1. Check if token is missing
  if (!token) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // 2. Check if role is not in allowedRoles
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. If all good, render children
  return children;
};

export default ProtectedRoute;
