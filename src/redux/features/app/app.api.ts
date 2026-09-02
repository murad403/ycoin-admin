import baseApi from "@/redux/api/api";
import {
    TLegalDocumentResponse,
    TUpdateLegalDocumentRequest,
    TRetrieveUsersResponse,
    TRetrieveUsersQueryParams,
    TKnowledgeBaseItem,
    TRetrieveKnowledgeBasesResponse,
    TCreateKnowledgeBaseRequest,
    TUpdateKnowledgeBaseRequest,
    TRetrieveKnowledgeBasesQueryParams,
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

        // knowledge base**************************************************************
        retrieveKnowledgeBases: builder.query<TRetrieveKnowledgeBasesResponse, TRetrieveKnowledgeBasesQueryParams | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", params.page.toString());
                if (params?.page_size) queryParams.append("page_size", params.page_size.toString());
                if (params?.search) queryParams.append("search", params.search);
                const queryString = queryParams.toString();
                return {
                    url: `/knowledge-base/${queryString ? `?${queryString}` : ""}`,
                    method: "GET",
                };
            },
            providesTags: ["KnowledgeBases"],
        }),
        retrieveKnowledgeBaseDetails: builder.query<TKnowledgeBaseItem, string>({
            query: (id) => ({
                url: `/knowledge-base/${id}/`,
                method: "GET",
            }),
            providesTags: ["KnowledgeBases"],
        }),
        createKnowledgeBase: builder.mutation<TKnowledgeBaseItem, TCreateKnowledgeBaseRequest>({
            query: (data) => ({
                url: `/knowledge-base/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["KnowledgeBases"],
        }),
        updateKnowledgeBase: builder.mutation<TKnowledgeBaseItem, { id: string; data: TUpdateKnowledgeBaseRequest }>({
            query: ({ id, data }) => ({
                url: `/knowledge-base/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["KnowledgeBases"],
        }),
        deleteKnowledgeBase: builder.mutation<void, string>({
            query: (id) => ({
                url: `/knowledge-base/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["KnowledgeBases"],
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
    useRetrieveKnowledgeBasesQuery,
    useRetrieveKnowledgeBaseDetailsQuery,
    useCreateKnowledgeBaseMutation,
    useUpdateKnowledgeBaseMutation,
    useDeleteKnowledgeBaseMutation,
} = appApi;
