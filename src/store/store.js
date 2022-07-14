import { configureStore } from "@reduxjs/toolkit";
import { auth } from "./slices/authSlice";
import { post } from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    auth: auth,
    post: post,
  },
});
