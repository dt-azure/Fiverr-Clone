import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./slice/loadingSlice";
import userSlice from "./slice/userSlice";


export const store = configureStore({
  reducer: {
    loadingSlice,
    userSlice,
  },
});
