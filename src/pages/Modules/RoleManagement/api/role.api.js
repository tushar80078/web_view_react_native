import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const roleAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: `/roles`,
        method: "POST",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,

      invalidatesTags: [RTK_TAGS.GET_ROLES],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_ROLES],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            roleAPI.util.invalidateTags([{ type: RTK_TAGS.GET_ROLES, id }])
          );
        } catch {
          // Handle error if needed
        }
      },
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_ROLES],
    }),
    getAllRoles: builder.query({
      query: () => ({
        url: `/roles`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_ROLES],
    }),
    getRoleById: builder.query({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: (result, error, id) => [{ type: RTK_TAGS.GET_ROLES, id }],
    }),
    getAvailableModules: builder.query({
      query: () => ({
        url: `/roles/modules`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useGetAvailableModulesQuery,
} = roleAPI;
