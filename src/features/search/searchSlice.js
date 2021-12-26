import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchedArticles = createAsyncThunk(
  "articles/search",
  async (searchVal) => {
    const response = await axios
      .get(
        `https://content.guardianapis.com/search?show-fields=thumbnail&q=${searchVal}&api-key=test`
      )
      .then(function(res) {
        return res.data.response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return { section: {webTitle: "Search results" },  results: response.results };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    articles: [],
    status: "idle",
    error: null
  },
  extraReducers: {
    [fetchSearchedArticles.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSearchedArticles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.articles = action.payload;
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

export default searchSlice.reducer;
