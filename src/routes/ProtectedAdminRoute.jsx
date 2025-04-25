// src/routes/ProtectedAdminRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const isAdminAuthenticated = !!sessionStorage.getItem("admin-token");

  return isAdminAuthenticated ? (
    children
  ) : (
    <Navigate to="/admin-login" replace />
  );
};

export default ProtectedAdminRoute;
