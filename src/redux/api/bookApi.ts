/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // login
    createBook: build.mutation({
      query: (data: any) => {
        return {
          url: `/books`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Book"],
    }),

    // get all books
    getAllBooks: build.query({
      query: (customerId) => ({
        url: `/books`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
  }),
});

export const { useGetAllBooksQuery, useCreateBookMutation } = bookApi;
