import apiSlice from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";
import { setPermissions } from "@/redux/slice/auth.slice";

export const loadingAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPermission: builder.query({
      query: (data) => ({
        url: `/roles/${data?.id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        dispatch(setPermissions(data.data.permissions));
      },

      transformErrorResponse: transferErrorResponse,
    }),
  }),
});

export const { useGetPermissionQuery, useLazyGetPermissionQuery } = loadingAPI;
