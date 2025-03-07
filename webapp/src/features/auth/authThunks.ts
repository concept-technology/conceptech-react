import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import apiClient from "../../api/authApi";


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

      const response = await apiClient.post("/api/token/refresh/", { refresh });
      Cookies.set("accessToken", response.data.accessToken);
      return response.data.accessToken;
    } catch (error: any) {
      return rejectWithValue("Session expired, please login again");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("accessToken");
});
