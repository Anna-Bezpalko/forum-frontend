import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post } from "../types/Post";

interface ApiPost {
  id: number;
  title: string;
  content: string;
  author?: string | { name?: string } | null;
  category?: string | { name?: string } | null;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "/posts",
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
  }),
});

export const { useGetPostsQuery } = baseApi;
