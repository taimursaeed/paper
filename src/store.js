import { configureStore } from "@reduxjs/toolkit";
import { articleService } from "./features/article/articleSlice";
import { homeService } from "./features/home/homeSlice";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, {
  localStorageMiddleware,
} from "./features/bookmarks/bookmarksSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    bookmarks: bookmarksSlice,
    [articleService.reducerPath]: articleService.reducer,
    [homeService.reducerPath]: homeService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleService.middleware)
      .concat(homeService.middleware)
      .concat(localStorageMiddleware),
});
