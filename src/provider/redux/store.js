import { configureStore } from "@reduxjs/toolkit";
import sideReducer from "./sidebarSlice";
const store = configureStore({
  reducer: {
    sidebar: sideReducer,
  },
});
export default store;
