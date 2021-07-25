import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  articles: [],
  status: "idle",
  error: null,
};
export const fetchHomeArticles = createAsyncThunk(
  "articles/fetchHomeArticles",
  async () => {
    const response = await axios
      .get(
        `https://content.guardianapis.com/news?api-key=test&show-fields=trailText,thumbnail`
      )
      .then(function (response) {
        return response.data.response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response.results;
  }
);
export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchHomeArticles.pending]: (state) => {
      state.status = "loading";
    },
    [fetchHomeArticles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.articles = action.payload;
    },
    [fetchHomeArticles.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
export const selectAllArticles = (state) => state.home.articles;
export const selectStatus = (state) => state.home.status;
export const selectError = (state) => state.home.error;
export const { setStatus } = homeSlice.actions;

export default homeSlice.reducer;
