import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";
import snackbarReducer from "./SnackbarSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    snackbar: snackbarReducer,
  },
});
