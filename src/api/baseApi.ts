import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/Post";

interface ApiPost {
  id: number;
  title: string;
  content: string;
  author?: string | { name?: string } | null;
  category?: string | { name?: string } | null;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  email: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  tagTypes: ["Posts", "Auth"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
      providesTags: ["Posts"],
      transformResponse: (response: ApiPost[]) =>
        response.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          author:
            typeof post.author === "string"
              ? post.author
              : post.author?.name ?? "Unknown author",
          category:
            typeof post.category === "string"
              ? post.category
              : post.category?.name ?? "General",
        })),
    }),

    getMe: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    register: builder.mutation<unknown, RegisterData>({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
    }),
    invalidatesTags: ["Auth"],
  }),

  login: builder.mutation<unknown, LoginData>({
    query: (data) => ({
      url: "/users/login",
      method: "POST",
      body: data,
    }),
    invalidatesTags: ["Auth"],
  }),
}),
});

export const {
useGetPostsQuery,
useGetMeQuery,
useRegisterMutation,
useLoginMutation,
} = baseApi;