import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { logOutUser } from "@/redux/slice/user.slice";

export const RTK_TAGS = {
  //   GET_COURSES: "GET_COURSES",
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_API_URL;

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "*");
      }
      return headers;
    },
  });
  const result = await baseQuery(args, api, extraOptions);

  const isTokenExpired = result?.error?.data?.msg === "jwt expired";

  if (isTokenExpired) {
    localStorage.clear();
    api.dispatch(logOutUser());
    toast.error("Your session has expired");
    return;
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: Object.values(RTK_TAGS),
});

export default apiSlice;
