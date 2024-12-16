import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newToken = params.get('token');
    if (newToken) {
      localStorage.setItem('authToken', newToken);
    }
  }, [location]);

  const storedToken = token || new URLSearchParams(location.search).get('token');
  return storedToken ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
