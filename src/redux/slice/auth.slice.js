import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  userDetails: false,
  permissions: [],
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
      state.permissions = [];
      localStorage.removeItem("token");
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const { loginUser, logOutUser, setPermissions } = userSlice.actions;

export default userSlice.reducer;
