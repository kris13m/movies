import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

/**
 * A wrapper component that protects routes meant for authenticated users.
 * - If the user is logged in, it renders the child component.
 * - If the user is not logged in, it redirects them to the /login page.
 * - It handles the initial loading state of the auth session to prevent flickering.
 */
function ProtectedRoute({ children }) {
  const { user, isLoadingSession } = useAuth();
  const location = useLocation();

  // 1. While we're checking for a session, show a loading indicator (or nothing)
  //    This prevents the user from being momentarily redirected to /login on a page refresh.
  if (isLoadingSession) {
    return <div>Loading session...</div>; // Or a spinner component
  }

  // 2. If the session check is complete and there is NO user, redirect to login.
  //    We also pass the current location in the state, so we can redirect back after login.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If the session check is complete AND there is a user, render the page.
  return children;
}

export default ProtectedRoute;