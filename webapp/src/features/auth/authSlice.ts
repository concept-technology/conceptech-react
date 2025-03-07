import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, logoutUser, refreshToken } from "./authThunks";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  userInfo: any | null; // Add userInfo field
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get("accessToken"), // Check if token exists
  token: Cookies.get("accessToken") || null, // Retrieve token from cookies
  loading: false,
  error: null,
  userInfo: null, // Initialize userInfo
};

const authSlice = createSlice({
  name: "auth", 
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;

        if (action.payload.accessToken) {
          Cookies.set("accessToken", action.payload.accessToken);
        } else {
          console.error("Access token is missing in response!");
        }

        if (action.payload.refreshToken) {
          Cookies.set("refreshToken", action.payload.refreshToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "An error occurred. Please try again.";
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        Cookies.set("accessToken", action.payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.userInfo = null; // Reset user info on logout
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
