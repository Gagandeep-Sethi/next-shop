const { createSlice } = require("@reduxjs/toolkit");

const sidebarSlice = createSlice({
  name: "sidebar",
  initial: false,
  reducers: {
    toggle: (state) => (state = !state),
  },
});
export default sidebarSlice.reducer;
export const { toggle } = sidebarSlice.actions;
