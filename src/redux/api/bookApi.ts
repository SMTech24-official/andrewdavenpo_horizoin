/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all books
    getAllBooks: build.query({
      query: () => {
        return {
          url: `/books`,
          method: "GET",
        };
      },
      providesTags: ["Books"],
    }),
    // get book by id
    getBookById: build.query({
      query: (id: string) => {
        return {
          url: `/books/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Books"],
    }),
    // add book
    crateBooks: build.mutation({
      query: (data: any) => {
        return {
          url: `/books`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Books"],
    }),
    // update book
    updateBook: build.mutation({
      query: (data: any) => {
        return {
          url: `/books/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Books"],
    }),
    // delete book
    deleteBook: build.mutation({
      query: (id: string) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useCrateBooksMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
