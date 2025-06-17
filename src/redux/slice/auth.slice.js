import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoggedIn: false,
  userDetails: false,
  permissions: false,
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
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
  },
});

export const { loginUser, logOutUser, setPermissions } = userSlice.actions;

export default userSlice.reducer;
