import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import apiClient from "../../api/authApi";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiClient.get("/api/users/me/", {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Fetch user error:", error); // Debugging
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedData: { username: string; email: string }, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await apiClient.patch("/api/users/me/", updatedData, {
        headers: { Authorization: `Bearer ${state.auth.token}` },
      });
      return response.data;
    } catch (error: any) {
      console.error("Update user error:", error); // Debugging
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

