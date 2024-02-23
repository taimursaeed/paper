import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSearchedArticles = createAsyncThunk(
  "articles/search",
  async (searchVal, { getState, dispatch }) => {
    const state = getState();
    if (selectSearchTerm(state) !== searchVal) {
      dispatch(resetPageIndex());
      dispatch(clearArticles());
      dispatch(setSearchTerm(searchVal));
    }

      const response = await fetch(
        `https://content.guardianapis.com/search?show-fields=thumbnail&q=${searchVal}&api-key=test&page-size=10&page=${state.search.pageIndex}`
      )
      .then(response => response.json())
      .then(data => data.response)
      .catch(function(error) {
        console.log(error);
      });
    return response.results;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    articles: { section: { webTitle: "Search results" }, results: [] },
    status: "idle",
    error: null,
    pageIndex: 1
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    incrementPageIndex: (state) => {
      state.pageIndex++;
    },
    resetPageIndex: (state) => {
      state.pageIndex = 1;
    },
    clearArticles: (state) => {
      state.articles.results = [];
    },
    reverseArticles(state) {
      state.articles.results = [...state.articles.results].reverse();
    }
  },
  extraReducers: {
    [fetchSearchedArticles.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSearchedArticles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.articles.results = state.articles.results.concat(action.payload);
    },
    [fetchSearchedArticles.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }
  }
});

export const selectStatus = (state) => state.search.status;
export const selectError = (state) => state.search.error;
export const selectSearchedArticles = (state) => state.search.articles;
export const selectPageIndex = (state) => state.search.pageIndex;
export const selectSearchTerm = (state) => state.search.searchTerm;
export const {
  incrementPageIndex,
  clearArticles,
  resetPageIndex,
  setSearchTerm,
  reverseArticles
} = searchSlice.actions;
export default searchSlice.reducer;
