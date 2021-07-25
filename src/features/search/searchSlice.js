import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: "",
};
export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { updateSearch } = searchSlice.actions;
export const selectSearch = (state) => state.search.value;
export default searchSlice.reducer;
