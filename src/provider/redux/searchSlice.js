import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    searchCache: (state, action) => {
      state = Object.assign(state, action.payload); //object is added in state object (...state , ...action.payload)
    },
  },
});
export const { searchCache } = searchSlice.actions;
export default searchSlice.reducer;
