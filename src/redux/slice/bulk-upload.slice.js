import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  data: [],
};

export const bulkUploadExcel = createSlice({
  name: "excelupload",
  initialState,
  reducers: {
    setExcelData: (state, action) => {
      console.log("action.payload", action.payload);
      state.data = action.payload;
    },
  },
});

export const { setExcelData } = bulkUploadExcel.actions;

export default bulkUploadExcel.reducer;
