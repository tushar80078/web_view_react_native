import { combineReducers } from "@reduxjs/toolkit";

import apiSlice from "@/redux/api/index";

import userSlice from "@/redux/slice/user.slice";
import bulkUploadSlice from "@/redux/slice/bulk-upload.slice";

const rootReducer = combineReducers({
  user: userSlice,
  excelupload: bulkUploadSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
