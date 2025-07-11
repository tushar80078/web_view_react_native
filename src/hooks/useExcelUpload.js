import { setExcelData } from "@/redux/slice/bulk-upload.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useExcelUpload = () => {
  const dispatch = useDispatch();
  const excelUploadData = useSelector((state) => state.excelupload);

  console.log("excelUploadData", excelUploadData);

  const setDataInSlice = (data) => {
    dispatch(setExcelData(data));
  };
  return {
    data: excelUploadData?.data || [],
    setDataInSlice,
  };
};

export default useExcelUpload;
