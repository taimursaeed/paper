import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionService = createApi({
  reducerPath: "sectionService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://content.guardianapis.com/" }),
  endpoints: (builder) => ({
    getSectionArticles: builder.query({
      query: (section) =>
        `${section}?api-key=test&show-fields=trailText,thumbnail&order-by=newest&page-size=${
          section === "news" ? 8 : 3
        }`,
      transformResponse: (response) => response.response,
    }),
  }),
});

export const { useGetSectionArticlesQuery } = sectionService;
