import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import homeReducer from "./features/home/homeSlice";
import articleSlice from "./features/article/articleSlice";
export default configureStore({
  reducer: { search: searchReducer, home: homeReducer, article: articleSlice },
});
