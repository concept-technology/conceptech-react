import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { SITE_DOMAIN } from "../../../api/apiClient";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SITE_DOMAIN,
    prepareHeaders: (headers, { endpoint }) => {
      const token = Cookies.get("accessToken");

      // List of endpoints that do NOT require authentication
      const publicEndpoints = ["getProducts"];

      if (token && !publicEndpoints.includes(endpoint)) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/api/users/me/",
        method: "GET",
      }),
    }),

    getProducts: builder.query({
      query: () => ({
        url: "/api/products/view/",
        method: "GET",
      }),
    }),


    getBlogPost: builder.query({
      query: () => ({
        url: "/api/blog/",
        method: "GET",
      }),
    }),

    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        return {
          url: "/api/token/refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        };
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          Cookies.set("accessToken", data.accessToken); // Store new access token
        } catch (error) {
          console.error("Token refresh failed", error);
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
        }
      },
    }),
  }),
});

export const { useGetUserDetailsQuery, useRefreshTokenMutation, useGetProductsQuery, useGetBlogPostQuery } = authApi;
