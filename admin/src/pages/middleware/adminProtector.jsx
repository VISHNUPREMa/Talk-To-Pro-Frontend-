import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getRefreshToken } from '../../utils/token';
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
        console.log("accessToken : ",accessToken);
        console.log("refreshToken : ",refreshToken);
        
        
      if (accessToken) {
        setIsAuthenticated(true);
        return
      } else if (refreshToken) {
        try {
          const response = await axios.put(`${BACKEND_SERVER}/admin/verifytoken`, { refreshToken });
          if (response.data.success) {
            setIsAuthenticated(true);
            return
          } else {
            setIsAuthenticated(false);
            return
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
        return
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
