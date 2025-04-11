// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// This component wraps a protected route. If the user is not logged in (or if the role is insufficient), we redirect.
const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but does not have the correct role
    return <Navigate to="/" replace />;
  }

  // Otherwise, user is good; render the protected component
  return children;
};

export default PrivateRoute;
