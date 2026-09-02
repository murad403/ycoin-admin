import baseApi from "@/redux/api/api";
import {
    TLegalDocumentResponse,
    TUpdateLegalDocumentRequest,
    TRetrieveUsersResponse,
    TRetrieveUsersQueryParams,
} from "./app.type";

const appApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // legal*************************************
        retrievePrivacyPolicy: builder.query<TLegalDocumentResponse, void>({
            query: () => ({
                url: `/privacy/`,
                method: "GET",
            }),
            providesTags: ["PrivacyPolicy"],
        }),
        updatePrivacyPolicy: builder.mutation<TLegalDocumentResponse, TUpdateLegalDocumentRequest>({
            query: (data) => ({
                url: `/privacy/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["PrivacyPolicy"],
        }),
        retrieveTermsAndConditions: builder.query<TLegalDocumentResponse, void>({
            query: () => ({
                url: `/terms/`,
                method: "GET",
            }),
            providesTags: ["TermsAndConditions"],
        }),
        updateTermsAndConditions: builder.mutation<TLegalDocumentResponse, TUpdateLegalDocumentRequest>({
            query: (data) => ({
                url: `/terms/`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["TermsAndConditions"],
        }),

        // users ****************************************************
        retrieveUsers: builder.query<TRetrieveUsersResponse, TRetrieveUsersQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", params.page.toString());
                if (params?.page_size) queryParams.append("page_size", params.page_size.toString());
                if (params?.search) queryParams.append("search", params.search);
                const queryString = queryParams.toString();
                return {
                    url: `/users/${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["Users"],
        }),
        deleteUser: builder.mutation<{ message?: string; detail?: string }, string>({
            query: (id) => ({
                url: `/users/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useRetrievePrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
    useRetrieveTermsAndConditionsQuery,
    useUpdateTermsAndConditionsMutation,
    useRetrieveUsersQuery,
    useDeleteUserMutation,
} = appApi;
