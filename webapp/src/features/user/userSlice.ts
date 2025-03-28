import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, updateUser } from "./userThunks";

interface UserState {
  id: number | null;
  username: string;
  email: string;
  profile_picture?: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  username: "",
  email: "",
  profile_picture: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.loading = false;
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.profile_picture = action.payload.profile_picture;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.profile_picture = action.payload.profile_picture;
      });
  },
});

export default userSlice.reducer;
