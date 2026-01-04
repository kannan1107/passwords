import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import reducer from "../store/authSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;

reducerPath: "Api";

tagtypes: ["User"];
export const appApi = createApi({
  reducerPath: "api",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Define your endpoints here
    register: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
      transformErrorResponse: (response, meta, arg) => {
        console.log("Login API Error:", response);
        return response;
      },
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      },
    }),

    // login user details

    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/users/:id",
        method: "GET",
        body: payload,
      }),
    }),

    fetchUser: builder.query({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    fetchAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: "/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchUserQuery,
  useFetchAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useForgetPasswordMutation,
} = appApi;
