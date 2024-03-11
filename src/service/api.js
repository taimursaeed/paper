import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://content.guardianapis.com/" }),
  endpoints: (builder) => ({
    getSectionArticles: builder.query({
      query: (section) =>
        `${section}?api-key=test&show-fields=trailText,thumbnail&order-by=newest&page-size=${
          section === "news" ? 8 : 3
        }`,
      transformResponse: (response) => response.response,
    }),
    getArticle: builder.query({
      query: (articleID) =>
        `${articleID}?api-key=test&show-fields=body,trailText,thumbnail`,
      transformResponse: (response) => response.response.content,
    }),
  }),
});

export const { useGetArticleQuery, useGetSectionArticlesQuery } = apiService;
