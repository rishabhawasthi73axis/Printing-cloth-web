import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    return null; // prevent any redirect or render while loading
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
