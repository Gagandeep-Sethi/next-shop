import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: false,
  reducers: {
    toggleState: (state) => {
      return (state = !state);
    },
  },
});
export default sidebarSlice.reducer;
export const { toggleState } = sidebarSlice.actions;
