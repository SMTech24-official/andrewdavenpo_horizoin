/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // signup

    signup: build.mutation({
      query: (data: any) => {
        return {
          url: `/users/register`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // login
    login: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // logout
    logout: build.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // get profile /profile

    getUserDataFromApi: build.query({
      query: () => {
        return {
          url: `/auth/profile`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation, useGetUserDataFromApiQuery } = authApi;
