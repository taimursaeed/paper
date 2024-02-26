import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/home/homeSlice";
import { articleService } from "./features/article/articleSlice";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, {
  localStorageMiddleware,
} from "./features/bookmarks/bookmarksSlice";

export default configureStore({
  reducer: {
    home: homeReducer,
    search: searchSlice,
    bookmarks: bookmarksSlice,
    [articleService.reducerPath]: articleService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleService.middleware)
      .concat(localStorageMiddleware),
});
