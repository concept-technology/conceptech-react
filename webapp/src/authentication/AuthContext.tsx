import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./ApiClint";



interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}
export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
  validateToken: ()=>void
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();


  const validateToken = async (): Promise<void> => {
    try {
      const response = await apiClient.post<RefreshTokenResponse>(
        `/api/token/refresh/`,
        {},
        { withCredentials: true }
      );
        setIsAuthenticated(true);
      
    } catch (error: any) {
      setIsAuthenticated(false);
      console.error("Token validation failed:", error.response?.data || error.message);
    }
  };

  // Validate token on initial render
  useEffect(() => {

    validateToken();
  }, []);

  const login = async () => {
    validateToken()
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
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
