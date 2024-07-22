import React, { useContext } from 'react';
import { AuthContext } from './jwtAuthContext';
import { Navigate } from 'react-router-dom';

function Dashboard({ children }) {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default Dashboard;

