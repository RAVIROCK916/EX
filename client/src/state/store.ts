import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth";
import profileReducer from "./reducers/profile";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
