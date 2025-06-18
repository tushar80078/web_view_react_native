import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const productAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_PRODUCTS],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_PRODUCTS],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),

      transformErrorResponse: transferErrorResponse,
      invalidatesTags: [RTK_TAGS.GET_PRODUCTS],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_PRODUCTS],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: (result, error, id) => [
        { type: RTK_TAGS.GET_PRODUCTS, id },
      ],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetAllProductsQuery,
} = productAPI;
