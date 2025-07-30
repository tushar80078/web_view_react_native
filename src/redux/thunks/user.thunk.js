import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "@/helper/axiosInterceptor";

export const userLoginThunk = createAsyncThunk(
  "userLoginThunk",
  async (model, thunkApi) => {
    try {
      const { email, password } = model;

      const fcmToken = localStorage.getItem("fcmToken");

      let res = await getAxios().post(`/notifications/login`, {
        username: email,
        password: password,
        fcmtoken: fcmToken || "",
      });

      const responseData = res.data;

      localStorage.setItem("token", responseData.data.token);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
