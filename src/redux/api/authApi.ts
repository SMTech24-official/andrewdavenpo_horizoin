/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

    // create helper
    createHelper: build.mutation({
      query: (data: any) => {
        return {
          url: `/helper/create-helper`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // customer signup

    createCustomer: build.mutation({
      query: (data: any) => {
        return {
          url: `/customer/create-customer`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // social login

    socialLogin: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/social-login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // varify otp

    verifyOtp: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/otp-enter`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // forgotten profile
    forgottenPassword: build.mutation({
      query: (data: { email: string }) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    // reset password profile
    resetPassword: build.mutation({
      query: (data: { id: number; password: string }) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    // get me
    getMyProfile: build.query({
      query: () => ({
        url: `/auth/get-me`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // change password
    changePassword: build.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    // get helper details

    // update helper
    updateHelper: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/helper/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    deleteHelper: build.mutation({
      query: (id) => {
        return {
          url: `/helper/delete/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    deleteCustomer: build.mutation({
      query: (id) => {
        return {
          url: `/customer/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // get customer details
    getCustomerDetails: build.query({
      query: (customerId) => ({
        url: `/customer/get-customer-details/${customerId}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // update customer
    updateCustomer: build.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/customer/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    updateUserStatus: build.mutation({
      query: (body) => {
        return {
          url: `/auth/update/update-status`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // /update/terms-and-privacy

    updateTermsAndPrivacy: build.mutation({
      query: () => {
        // console the data

        return {
          url: `/auth/update/terms-and-privacy`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    restoreAccount: build.mutation({
      query: (userId) => {
        return {
          url: `/auth/restore-account/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateHelperMutation,
  useForgottenPasswordMutation,
  useChangePasswordMutation,
  useGetMyProfileQuery,
  useResetPasswordMutation,
  useCreateCustomerMutation,
  useVerifyOtpMutation,
  useSocialLoginMutation,
  useUpdateHelperMutation,
  useGetCustomerDetailsQuery,
  useUpdateCustomerMutation,
  useDeleteHelperMutation,
  useDeleteCustomerMutation,
  useUpdateUserStatusMutation,
  useUpdateTermsAndPrivacyMutation,
  useRestoreAccountMutation,
} = authApi;
