import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { RootState } from "../app/store";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth) || { isAuthenticated: false };

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
