import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Validate token on initial render
  useEffect(() => {
    const validateToken = async () => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
            setIsAuthenticated(true);       
      }
    };

    validateToken();
  }, []);

  const login = async () => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
          setIsAuthenticated(true);      
    }
  };

  const logout = () => {
    // Clear cookies
    Cookies.remove("access_token", { path: "/", secure: true, sameSite: "Strict" });
    Cookies.remove("refresh_token", { path: "/", secure: true, sameSite: "Strict" });
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
