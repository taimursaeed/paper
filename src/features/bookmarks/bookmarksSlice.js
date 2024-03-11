import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBookmarkArticles = createAsyncThunk(
  "articles/fetchBookmarkArticles",
  async (_, { getState }) => {
    let response;
    let articleIDs = selectBookmarkArticlesIDs(getState());

    const calls = articleIDs.map((id) =>
      fetch(
        `https://content.guardianapis.com/${id}?api-key=test&show-fields=body,trailText,thumbnail`
      ).then((response) => response.json())
    );

    //concurrent calls
    await Promise.all(calls)
      .then((res) => {
        response = res.map((r) => {
          return r.response.content;
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return response;
  }
);

export const localStorageMiddleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem(
    "articleIDs",
    selectBookmarkArticlesIDs(store.getState())
  );
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    articleIDs: [],
    articles: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setBookmarks: (state, action) => {
      state.articleIDs = action.payload;
    },
    clearBookmarks: (state) => {
      state.articleIDs = state.articles = [];
    },
    addBookmark: (state, action) => {
      state.articleIDs.push(action.payload);
    },
    removeBookmark: (state, action) => {
      const foundIndex = state.articleIDs.findIndex(
        (id) => id === action.payload
      );
      state.articleIDs.splice(foundIndex, 1);
    },
    reverseArticles(state) {
      state.articles = [...state.articles].reverse();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarkArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookmarkArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchBookmarkArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const selectBookmarkArticlesIDs = (state) => state.bookmarks.articleIDs;
export const selectBookmarkArticles = (state) => state.bookmarks.articles;
export const selectStatus = (state) => state.bookmarks.status;
export const selectError = (state) => state.bookmarks.error;
export const {
  setStatus,
  addBookmark,
  removeBookmark,
  reverseArticles,
  setBookmarks,
  clearBookmarks,
} = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
