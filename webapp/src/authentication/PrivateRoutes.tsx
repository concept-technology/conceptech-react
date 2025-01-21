import React, { useEffect } from "react";
import { Navigate} from "react-router-dom";
import { token } from "./ApiClint";
import { validateToken } from "./AuthContext";



interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
      if (!token){
        <Navigate to="/login" replace/>
      }
      useEffect(()=>{
        validateToken()
      },[])
      return  children 
};

export default PrivateRoute;


