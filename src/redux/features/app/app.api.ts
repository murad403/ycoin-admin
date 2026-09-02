import baseApi from "@/redux/api/api";

const appApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // legal*************************************
        signIn: builder.mutation({
            query: (data) => ({
                url: `/auth/login/`,
                method: "POST",
                body: data,
            }),
        }),
    })
});

export const {
    
} = appApi;

