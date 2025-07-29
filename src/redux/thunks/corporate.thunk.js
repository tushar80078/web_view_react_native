import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "@/helper/axiosInterceptor";

export const uploadBulkFile = createAsyncThunk(
  "certification/uploadBulkFile",
  async (file, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await getAxios().post(`/certification/upload-csv`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Always blob, even for JSON
      });

      const contentType = res.headers["content-type"];

      if (contentType.includes("text/csv")) {
        return { errorFile: res.data };
      } else if (contentType.includes("application/json")) {
        return { jsonBlob: res.data };
      }
    } catch (error) {
      const contentType = error?.response?.headers?.["content-type"];
      const data = error?.response?.data;

      if (data instanceof Blob && contentType?.includes("text/csv")) {
        return thunkApi.fulfillWithValue({ errorFile: data });
      }

      return thunkApi.rejectWithValue("Upload failed");
    }
  }
);
