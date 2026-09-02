import baseApi from "@/redux/api/api";
import { TSignInRequest, TSignInResponse, TForgotPasswordRequest, TForgotPasswordResponse, TForgotPasswordVerifyOtpRequest, TForgotPasswordVerifyOtpResponse, TResetPasswordRequest, TResetPasswordResponse, TChangePasswordRequest, TChangePasswordResponse, TProfileResponse } from "./auth.type";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<TSignInResponse, TSignInRequest>({
            query: (data) => ({
                url: `/auth/login/`,
                method: "POST",
                body: data,
            }),
        }),
        forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
            query: (data) => ({
                url: `/auth/password-reset/request-otp/`,
                method: "POST",
                body: data,
            }),
        }),
        forgotPasswordVerifyOtp: builder.mutation<TForgotPasswordVerifyOtpResponse, TForgotPasswordVerifyOtpRequest>({
            query: (data) => ({
                url: `/auth/password-reset/verify-otp/`,
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
            query: (data) => ({
                url: `/auth/password-reset/`,
                method: "POST",
                body: data,
            }),
        }),
        changePassword: builder.mutation<TChangePasswordResponse, TChangePasswordRequest>({
            query: (data) => ({
                url: `/auth/change-password/`,
                method: "POST",
                body: data,
            }),
        }),

        // profile*************************************
        getProfile: builder.query<TProfileResponse, void>({
            query: () => ({
                url: `/profile/`,
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),
        updateProfile: builder.mutation<TProfileResponse, FormData>({
            query: (data) => ({
                url: `/profile/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useSignInMutation,
    useForgotPasswordMutation,
    useForgotPasswordVerifyOtpMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
} = authApi;

