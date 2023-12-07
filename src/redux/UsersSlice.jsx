import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [
      {
        id: "101",
        username: "Bret",
        email: "Sincere@april.biz",
        role: "user",
      },
      {
        id: "102",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        role: "admin",
      },
      {
        id: "103",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        role: "admin",
      },
      {
        id: "104",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        role: "user",
      },
      {
        id: "105",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        role: "user",
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: uuid(),
        ...action.payload,
      });
    },
    editUser: (state, action) => {
      const { id, username, email, role } = action.payload;
      const user = state.users.findIndex((el) => el.id === String(id));

      if (user !== -1) {
        state.users[user] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      const deletedBoard = state.users.filter(
        (item) => item.id !== action.payload
      );

      state.users = deletedBoard;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
