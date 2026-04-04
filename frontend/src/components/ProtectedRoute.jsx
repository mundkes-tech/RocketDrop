import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRocketDrop } from '../hooks/useRocketDrop';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useRocketDrop();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
