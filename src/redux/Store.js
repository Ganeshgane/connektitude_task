import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
