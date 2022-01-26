import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticle = createAsyncThunk(
  "article/fetchArticle",
  async (articleID) => {
    const response = await axios
      .get(
        `https://content.guardianapis.com/${articleID}?api-key=test&show-fields=body,trailText,thumbnail`
      )
      .then(function (res) {
        return res.data.response;
      })
      .catch(function (error) {
        console.log(error);
      });
    return response?.content;
  }
);
export const articleSlice = createSlice({
  name: "article",
  initialState:{
    article: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchArticle.pending]: (state) => {
      state.status = "loading";
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.article = action.payload;
    },
    [fetchArticle.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
export const selectArticle = (state) => state.article.article;
export const selectStatus = (state) => state.article.status;
export const selectError = (state) => state.article.error;
export const { setStatus } = articleSlice.actions;

export default articleSlice.reducer;
