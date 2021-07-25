import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  articles: [],
  status: "idle",
  error: null,
};
export const fetchSections = createAsyncThunk(
  "articles/fetchSections",
  async (sections) => {
    let response;
    const calls = sections.map((section) =>
      axios.get(
        `https://content.guardianapis.com/${section}?api-key=test&show-fields=trailText,thumbnail&page-size=${
          section === "news" ? 8 : 3
        }`
      )
    );

    //concurrent calls
    await axios
      .all(calls)
      .then((res) => {
        console.log(res);
        response = res.map((r) => {
          return {
            section: r.data.response.section.webTitle,
            articles: r.data.response,
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
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
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
export const { setStatus } = homeSlice.actions;

export default homeSlice.reducer;
