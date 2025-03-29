import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { loginUser, logoutUser, refreshToken, googleLogin } from "./authThunks";

interface User {
  id?: number;
  username?: string;
  email: string;
  role?: string;
  provider?: string; // Indicate Google login
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  userInfo: User | null;
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
    setCredentials: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Handle Email/Password Login**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: User }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.accessToken;
          state.userInfo = action.payload.user;


        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "An error occurred. Please try again.";
      })

      // **Handle Google Login**
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        googleLogin.fulfilled,
        (state, action: PayloadAction<{ accessToken: string; user: User,refreshToken:string }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.accessToken;
          state.userInfo = { ...action.payload.user, provider: "google" };

          // Store token in cookies
          Cookies.set("accessToken", action.payload.accessToken, { secure: true, sameSite: "Strict" });
          Cookies.set("refreshToken", action.payload.refreshToken, { secure: true, sameSite: "Strict" });
        }
      )
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = "Google login failed. Please try again.";
      })

      // **Handle Token Refresh**
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ accessToken: string }>) => {
        state.token = action.payload.accessToken;
        Cookies.set("accessToken", action.payload.accessToken, { secure: true, sameSite: "Strict" });
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.userInfo = null;
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      })

      // **Handle Logout**
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.userInfo = null;
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
