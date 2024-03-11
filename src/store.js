import { configureStore } from "@reduxjs/toolkit";
import { articleService } from "./features/article/articleSlice";
import { sectionService } from "./features/home/homeSlice";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, {
  localStorageMiddleware,
} from "./features/bookmarks/bookmarksSlice";

export default configureStore({
  reducer: {
    search: searchSlice,
    bookmarks: bookmarksSlice,
    [articleService.reducerPath]: articleService.reducer,
    [sectionService.reducerPath]: sectionService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articleService.middleware)
      .concat(sectionService.middleware)
      .concat(localStorageMiddleware),
});
