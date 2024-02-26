import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleService = createApi({
  reducerPath: "articleService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://content.guardianapis.com/" }),
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (articleID) =>
        `${articleID}?api-key=test&show-fields=body,trailText,thumbnail`,
      transformResponse: (response) => response.response.content,
    }),
  }),
});

export const { useGetArticleQuery } = articleService;
