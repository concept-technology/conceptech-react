import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import apiClient from "../../api/userApi";

interface User {
  id: number;
  username: string;
  email: string;
  profile_picture?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const response = await apiClient.get("/api/users/me/", {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// Update user profile
export const updateUser = createAsyncThunk("user/updateUser", async (updatedData: Partial<User>, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const response = await apiClient.patch("/api/users/me/", updatedData, {
      headers: { Authorization: `Bearer ${state.auth.token}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
