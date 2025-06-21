import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !(user.roles && user.roles.some(r => r.authority === 'ROLE_ADMIN'))) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute; 