import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import searchReducer from "./searchSlice";
import orderReducer from "./orderSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
    order: orderReducer,
  },
});
export default store;
