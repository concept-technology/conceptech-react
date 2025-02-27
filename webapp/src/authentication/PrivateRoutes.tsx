import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "./AuthContext";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Optional: Show a loading state while checking authentication
  }

  return children;
};

export default PrivateRoute;
