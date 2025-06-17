import { combineReducers } from "@reduxjs/toolkit";

import apiSlice from "@/redux/api/index";

import authSlice from "@/redux/slice/auth.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
