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
        const { data } = await queryFulfilled;

        localStorage.setItem("token", data.data.token);

        dispatch(loginUser(data.data));

        toast.success("Logged In!!");
      },
      transformErrorResponse: transferErrorResponse,
    }),
  }),
});

export const { useLoginMutation } = authApi;
