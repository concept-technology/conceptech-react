import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "./AuthContext";


interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    // location.reload()
    return <Navigate to="/login"  replace />;
  }
  return children;
};

export default PrivateRoute;


