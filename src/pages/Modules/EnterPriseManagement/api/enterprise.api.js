import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const enterpriseAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnterprise: builder.mutation({
      query: (data) => ({
        url: `/enterprises`,
        method: "POST",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_ENTERPRISES],
    }),
    updateEnterprise: builder.mutation({
      query: ({ id, data }) => ({
        url: `/enterprises/${id}`,
        method: "PUT",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_ENTERPRISES],
    }),
    deleteEnterprise: builder.mutation({
      query: (id) => ({
        url: `/enterprises/${id}`,
        method: "DELETE",
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_ENTERPRISES],
    }),
    getAllEnterprises: builder.query({
      query: () => ({
        url: `/enterprises`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_ENTERPRISES],
    }),
  }),
});

export const {
  useCreateEnterpriseMutation,
  useUpdateEnterpriseMutation,
  useDeleteEnterpriseMutation,
  useGetAllEnterprisesQuery,
  useLazyGetAllEnterprisesQuery,
} = enterpriseAPI;
