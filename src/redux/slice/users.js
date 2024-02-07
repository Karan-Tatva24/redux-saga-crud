import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: [
    {
      id: 0,
      name: "",
      email: "",
      password: "",
    },
  ],
  reducers: {
    getUsersSlice: (state, action) => {
      state = action.payload;
    },
    addUserSlice: (state, action) => {
      state.push(action.payload);
    },
    editUserSlice: (state, action) => {
      state = state.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
      return state;
    },
    deleteUsersSlice: (state, action) => {
      state = state.filter((i) => i.id !== action.payload);
      return state;
    },
  },
});

export default users.reducer;
export const { getUsersSlice, addUserSlice, editUserSlice, deleteUsersSlice } =
  users.actions;
