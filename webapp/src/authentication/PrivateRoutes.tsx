import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth } from "./AuthContext";


interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  if (!isAuthenticated) {
    try{

      login()
    }catch{

      return <Navigate to="/login"  replace />;
    }
  }
  return children;
};

export default PrivateRoute;


