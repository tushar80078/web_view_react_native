import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const employeeAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: `/employees`,
        method: "POST",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_EMPLOYEES],
    }),
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_EMPLOYEES],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_EMPLOYEES],
    }),
    getAllEmployees: builder.query({
      query: () => ({
        url: `/employees`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_EMPLOYEES],
    }),
    getEmployeeById: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: (result, error, id) => [
        { type: RTK_TAGS.GET_EMPLOYEES, id },
      ],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useLazyGetAllEmployeesQuery,
} = employeeAPI;
