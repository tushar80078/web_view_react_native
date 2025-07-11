import { createAsyncThunk } from "@reduxjs/toolkit";
import getAxios from "@/helper/axiosInterceptor";

export const userLoginThunk = createAsyncThunk(
  "userLoginThunk",
  async (model, thunkApi) => {
    try {
      const { email, password } = model;

      let res = await getAxios().post(`/user/login`, {
        email: email,
        password: password,
      });

      const responseData = res.data;

      localStorage.setItem("token", responseData.data.token);
      return responseData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
