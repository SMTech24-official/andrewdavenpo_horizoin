import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASEAPI = process.env.NEXT_PUBLIC_BASEURL;
// console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEAPI,
    prepareHeaders: (headers: Headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("authorization", `${token}`);
        }
      }
      return headers;
    },
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Auth", "Books", "Videos", "Users"."Orders"],
});
