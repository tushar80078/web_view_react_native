import { combineReducers } from "@reduxjs/toolkit";

import apiSlice from "@/redux/api/index";

import userSlice from "@/redux/slice/user.slice";

const rootReducer = combineReducers({
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
