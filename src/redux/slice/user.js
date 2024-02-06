import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    id: 0,
    name: "",
    email: "",
    password: "",
  },
  reducers: {
    setUserSlice: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default user.reducer;
export const { setUserSlice } = user.actions;
