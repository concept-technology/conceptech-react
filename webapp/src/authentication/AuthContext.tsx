import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./ApiClint";
import Cookies from "js-cookie";


interface AuthContextType {
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
}
export interface RefreshTokenResponse {
  access: string;
  refresh?: string;
  __AccessTOKen__:string
  __AccessTOKenref__:string
  validateToken: ()=>void
}


export const validateToken = async (): Promise<void> => {
  try {
    const response = await apiClient.post<RefreshTokenResponse>(
      `/api/token/refresh/`,
      {},
      {withCredentials: true }
    );

    localStorage.setItem('authenticated','true')
    Cookies.set('refresh',response.data.__AccessTOKenref__)
    Cookies.set('accessToken',response.data.__AccessTOKen__)
  } catch (error: any) {
    console.error("Token validation failed:", error.response?.data || error.message);
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();


  const login = async () => {
    useEffect(()=>{
      validateToken()
      setIsAuthenticated(true);
    },[])

  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('accessToken')
    Cookies.remove('refresh')
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
