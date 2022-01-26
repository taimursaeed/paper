import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookmarkArticles = createAsyncThunk("articles/fetchBookmarkArticles", async (_, { getState }) => {
  let response;
  let articleIDs = selectBookmarkArticlesIDs(getState());
  const calls = articleIDs.map((id) => axios.get(`https://content.guardianapis.com/${id}?show-fields=trailText,thumbnail&api-key=test`));

  //concurrent calls
  await axios
    .all(calls)
    .then((res) => {
      response = res.map((r) => {
        return r.data.response.content;
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  return response;
});

export const localStorageMiddleware = store => next => action => {
  next(action);
  if (bookmarksSlice.actions.addBookmark.match(action) || bookmarksSlice.actions.removeBookmark.match(action)) {
    localStorage.setItem("articleIDs", selectBookmarkArticlesIDs(store.getState()));
  }
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    articleIDs: [],
    articles: [],
    status: "idle",
    error: null
  },
  reducers: {
    setBookmarks: (state, action) => {
      state.articleIDs = action.payload;
    },
    addBookmark: (state, action) => {
      state.articleIDs.push(action.payload);
    },
    removeBookmark: (state, action) => {
      const foundIndex = state.articleIDs.findIndex(id => id === action.payload);
      state.articleIDs.splice(foundIndex, 1);
    },
    reverseArticles(state) {
      state.articles = [...state.articles].reverse();
    }
  },
  extraReducers: {
    [fetchBookmarkArticles.pending]: (state) => {
      state.status = "loading";
    }, [fetchBookmarkArticles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.articles = action.payload;
    }, [fetchBookmarkArticles.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    }
  }
});
export const selectBookmarkArticlesIDs = (state) => state.bookmarks.articleIDs;
export const selectBookmarkArticles = (state) => state.bookmarks.articles;
export const selectStatus = (state) => state.bookmarks.status;
export const selectError = (state) => state.bookmarks.error;
export const { setStatus, addBookmark, removeBookmark, reverseArticles, setBookmarks } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
