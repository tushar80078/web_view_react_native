import apiSlice, { RTK_TAGS } from "@/redux/api/index";
import { transferErrorResponse } from "@/lib/transferResponse";

export const dashboardAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_DASHBOARD],
    }),
    getQuickStats: builder.query({
      query: () => ({
        url: `/dashboard/quick-stats`,
        method: "GET",
      }),

      transformErrorResponse: transferErrorResponse,
      providesTags: [RTK_TAGS.GET_DASHBOARD],
    }),
  }),
});

export const {
  useGetDashboardDataQuery,
  useGetQuickStatsQuery,
  useLazyGetDashboardDataQuery,
} = dashboardAPI;
