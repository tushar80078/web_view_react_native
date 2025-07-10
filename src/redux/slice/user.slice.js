import { createSlice } from "@reduxjs/toolkit";
import { userLoginThunk } from "../thunks/user.thunk";

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

  extraReducers: (builder) => {
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.user;
      state.isLoggedIn = true;
    });
  },
});

export const { loginUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
