import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/home/homeSlice";
import articleSlice from "./features/article/articleSlice";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, { localStorageMiddleware } from "./features/bookmarks/bookmarksSlice";

export default configureStore({
  reducer: { home: homeReducer, article: articleSlice, search: searchSlice, bookmarks: bookmarksSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});
