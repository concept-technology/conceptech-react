import React from "react";
import { Navigate} from "react-router-dom";
import { token } from "./ApiClint";



interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

      return token ? children :<Navigate to="/login" />; 
};

export default PrivateRoute;


