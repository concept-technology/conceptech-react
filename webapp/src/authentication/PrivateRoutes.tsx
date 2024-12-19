
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated, login,logout } = useAuth() 
    console.log("IsAuthenticated:", isAuthenticated); // Debugging
    if (!isAuthenticated) {
        logout()
        return <Navigate to="/login" replace />;
    }
    login()
    return children;
};

export default PrivateRoute;
