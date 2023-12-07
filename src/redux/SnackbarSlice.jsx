import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
    severity: "error",
  },
  reducers: {
    success: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.severity = "success";
    },
    failure: (state, action) => {
      state.open = true;
      state.message = action.payload;
      state.severity = "error";
    },
    close: (state, action) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { success, failure, close } = snackbarSlice.actions;

export default snackbarSlice.reducer;
