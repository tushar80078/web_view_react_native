import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const usersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_USERS],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_USERS],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_USERS],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_USERS],
    }),
    toggleUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_USERS],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useToggleUserStatusMutation,
} = usersAPI;
