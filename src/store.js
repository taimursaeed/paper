import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/home/homeSlice";
import articleSlice from "./features/article/articleSlice";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, { localStorageMiddleware } from "./features/bookmarks/bookmarksSlice";
import authSlice from "./features/auth/authSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    article: articleSlice,
    search: searchSlice,
    bookmarks: bookmarksSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});
