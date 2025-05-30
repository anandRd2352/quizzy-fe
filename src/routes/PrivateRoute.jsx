import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  // Dummy auth check (replace with your real auth logic)
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Role mismatch, redirect to unauthorized page or login
    return <Navigate to="/login" replace />;
  }

  // Authorized, render children
  return children;
};

export default PrivateRoute;
