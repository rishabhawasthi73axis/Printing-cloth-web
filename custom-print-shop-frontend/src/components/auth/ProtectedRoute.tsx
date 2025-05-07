
import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Log for debugging purposes
  useEffect(() => {
    console.log('Protected route:', { 
      path: location.pathname,
      requireAdmin,
      isLoading,
      hasUser: !!user,
      isAdmin: user?.isAdmin
    });
  }, [location.pathname, requireAdmin, isLoading, user]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium text-gray-700">Loading admin panel...</p>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we verify your credentials</p>
      </div>
    );
  }
  
  if (!user) {
    // Redirect to the appropriate login page
    const redirectTo = requireAdmin ? '/admin/login' : '/login';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  if (requireAdmin && !user.isAdmin) {
    console.log('Non-admin user trying to access admin route:', user);
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;