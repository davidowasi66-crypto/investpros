
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { checkUserRole } from '@/services/userService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isAdmin, isLoading } = useAuth();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(requireAdmin);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  // Effect to double-check admin status if required
  useEffect(() => {
    // Only run this effect if admin access is required and we have a user
    if (requireAdmin && user && !isAdmin) {
      setIsCheckingAdmin(true);
      
      // Double-check admin status directly from the database
      const verifyAdmin = async () => {
        try {
          const isUserAdmin = await checkUserRole(user.id, 'admin');
          console.log('Direct admin check result:', isUserAdmin);
          setHasAdminAccess(isUserAdmin);
        } catch (error) {
          console.error('Error verifying admin status:', error);
          setHasAdminAccess(false);
        } finally {
          setIsCheckingAdmin(false);
        }
      };
      
      verifyAdmin();
    } else if (requireAdmin && isAdmin) {
      // If context already says user is admin, trust it
      setHasAdminAccess(true);
      setIsCheckingAdmin(false);
    } else {
      // Not requiring admin, or no user
      setIsCheckingAdmin(false);
    }
  }, [user, isAdmin, requireAdmin]);

  // Debug output
  console.log("ProtectedRoute - State:", { 
    user: !!user, 
    isAdmin, 
    isLoading, 
    requireAdmin,
    isCheckingAdmin,
    hasAdminAccess 
  });

  if (isLoading || isCheckingAdmin) {
    // Show a loading state while checking authentication or admin status
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('User not authenticated, redirecting to auth page');
    return <Navigate to="/auth" replace />;
  }

  // If admin access is required but user is not admin (after direct check)
  if (requireAdmin && !isAdmin && !hasAdminAccess) {
    console.log('Admin access required but user is not admin, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // If all checks pass, render the children
  console.log('Access granted, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
