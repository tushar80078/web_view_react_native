import toast from "react-hot-toast";
import apiSlice from "@/redux/api/index";
import { loginUser } from "@/redux/slice/auth.slice";
import { transferErrorResponse } from "@/lib/transferResponse";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Store token
          localStorage.setItem("token", data.data.token);

          // Dispatch user data to Redux store
          dispatch(loginUser(data.data.user));

          toast.success("Login successful!");
        } catch (error) {
          // Error is handled by transformErrorResponse
          console.error("Login error:", error);
        }
      },
      transformErrorResponse: transferErrorResponse,
    }),
    regenerateAdminPassword: builder.mutation({
      query: () => ({
        url: "/auth/regenerate-admin-password",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success("Admin password regenerated!");
        } catch (error) {
          toast.error(
            error?.error?.data?.message || "Failed to regenerate admin password"
          );
        }
      },
      transformErrorResponse: transferErrorResponse,
    }),
  }),
});

export const { useLoginMutation, useRegenerateAdminPasswordMutation } = authApi;
