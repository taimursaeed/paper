import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./features/search/searchSlice";
import bookmarksSlice, {
  localStorageMiddleware,
} from "./features/bookmarks/bookmarksSlice";
import { apiService } from "./service/api";
export default configureStore({
  reducer: {
    search: searchSlice,
    bookmarks: bookmarksSlice,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiService.middleware)
      .concat(localStorageMiddleware),
});
