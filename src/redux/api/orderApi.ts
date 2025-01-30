/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all orders
    getAllOrders: build.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    createOrder: build.mutation({
      query: (data: any) => {
        return {
          url: `/orders/create-order`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation } = orderApi;
