import baseApi from "@/redux/api/api";
import { TLegalDocumentResponse, TUpdateLegalDocumentRequest } from "./app.type";

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
    }),
});

export const {
    useRetrievePrivacyPolicyQuery,
    useUpdatePrivacyPolicyMutation,
    useRetrieveTermsAndConditionsQuery,
    useUpdateTermsAndConditionsMutation,
} = appApi;
