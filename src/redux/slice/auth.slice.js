import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  userDetails: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.userDetails = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
