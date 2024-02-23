import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSections = createAsyncThunk(
  "articles/fetchSections",
  async (sections) => {
    let response;
    const calls = sections.map((section) =>
      fetch(
        `https://content.guardianapis.com/${section}?api-key=test&show-fields=trailText,thumbnail&order-by=newest&page-size=${
          section === "news" ? 8 : 3
        }`
      ).then((response) => response.json())
    );

    //concurrent calls
    await Promise.all(calls)
      .then((res) => {
        response = res.map((r) => {
          return {
            section: r.response.section.webTitle,
            articles: r.response,
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    reverseArticles(state) {
      const articles = [...state.articles];
      for (const [id, article] of articles.entries()) {
        articles[id].articles.results = [...article.articles.results].reverse();
      }
      state.articles = articles;
    },
  },
  extraReducers: {
    [fetchSections.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSections.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.articles = action.payload;
    },
    [fetchSections.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
export const selectAllArticles = (state) => state.home.articles;
export const selectStatus = (state) => state.home.status;
export const selectError = (state) => state.home.error;
export const { setStatus, reverseArticles } = homeSlice.actions;

export default homeSlice.reducer;
