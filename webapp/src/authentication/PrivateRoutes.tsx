import React from "react";
import { Navigate} from "react-router-dom";
import { useAuth} from "./AuthContext";
import {  token } from "../user/UserAccount";


interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {login} =useAuth()
  const tokens = token
  if (!tokens) {
      return <Navigate to="/login"  replace />;
    }
    login()
  return children;
};

export default PrivateRoute;


