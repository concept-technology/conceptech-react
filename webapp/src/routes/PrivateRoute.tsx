import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { RootState } from "../app/store";
import { refreshToken } from "../app/services/auth/refreshToken";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth) || { isAuthenticated: false };

  useEffect(()=>{
    refreshToken()
  },[])
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated === null) {

    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  }

  return children;
};

export default PrivateRoute;
