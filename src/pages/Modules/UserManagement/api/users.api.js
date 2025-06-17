import apiSlice from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";
import { setPermissions } from "@/redux/slice/auth.slice";

export const usersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.query({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        data: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setPermissions(data.data.permissions));
      },

      transformErrorResponse: transferErrorResponse,
    }),
  }),
});

export const { useGetPermissionQuery, useLazyGetPermissionQuery } = usersAPI;
