import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    id: undefined,
    username: undefined,
    profile_picture_url: undefined,
  },
  reducers: {
    setProfile: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.profile_picture_url = action.payload.profile_picture_url;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
