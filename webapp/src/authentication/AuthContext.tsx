import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./ApiClint";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await apiClient.post(
      `/api/token/refresh/`,
      {},
      { withCredentials: true }
    );

    Cookies.set("refresh", response.data.__AccessTOKenref__);
    Cookies.set("accessToken", response.data.__AccessTOKen__);
    localStorage.setItem("isAuthenticated", "true");

    return true;
  } catch (error: any) {
    console.error("Token validation failed:", error.response?.data || error.message);
    localStorage.removeItem("isAuthenticated");
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const storedAuth = localStorage.getItem("isAuthenticated") === "true";
      if (storedAuth && Cookies.get("accessToken")) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    const isValid = await validateToken();
    if (isValid) {
      setIsAuthenticated(true);
      setTimeout(() => {
        window.location.reload(); // Force a one-time refresh
      }, 500); 
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove("accessToken");
    Cookies.remove("refresh");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
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
