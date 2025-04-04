import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import apiClient from "../../api/authApi";
import axios from "axios";
import { SITE_DOMAIN } from "../../api/apiClient";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/login/", credentials);
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken);
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refresh = Cookies.get("refreshToken");
      if (!refresh) throw new Error("No refresh token available");

      const response = await apiClient.post("/api/token/refresh/", {},      
        {withCredentials:true});
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue("Session expired, please login again");
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/loginWithGoogle",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SITE_DOMAIN}/api/auth/google/login/`, {
        token,
      });
      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken, {
       
        sameSite: "Lax",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Google login failed");
    }
  }
);



export const logoutUser = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("accessToken");
});
