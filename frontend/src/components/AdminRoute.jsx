import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRocketDrop } from '../hooks/useRocketDrop';

const isAdminUser = (user) => {
  const role = String(user?.role || '').toUpperCase();
  return role === 'ADMIN' || role === 'ROLE_ADMIN';
};

const AdminRoute = ({ children }) => {
  const { currentUser } = useRocketDrop();

  if (!currentUser) {
    console.warn('[Route] AdminRoute denied: no currentUser');
    return <Navigate to="/login" replace />;
  }

  if (!isAdminUser(currentUser)) {
    console.warn('[Route] AdminRoute denied: non-admin role', { role: currentUser?.role });
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
