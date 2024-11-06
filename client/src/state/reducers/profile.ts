import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
	initialState: {
		id: null,
    username: null,
  },
  reducers: {
		setProfile: (state, action) => {
			state.id = action.payload.id;
			state.username = action.payload.username;
		},
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
