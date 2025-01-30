/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ceatee video
    createVideo: build.mutation({
      query: (data: any) => {
        return {
          url: `/videos`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Videos"],
    }),

    // get all books
    getAllVideo: build.query({
      query: () => ({
        url: `/videos`,
        method: "GET",
      }),
      providesTags: ["Videos"],
    }),

    // get vidwdeo by id
    getVideoById: build.query({
      query: (id: string) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: ["Videos"],
    }),

    // update video by id

    updateVideo: build.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),

    // delete video by id
    deleteVideo: build.mutation({
      query: (id: string | null) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useGetAllVideoQuery,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videoApi;
