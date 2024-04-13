import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      //checking if the product is already added to cart if it is already it increases its quatity property by 1 rather then again adding it

      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item._id === existingItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart = [...state.cart, { ...newItem, quantity: 1 }];
      }
    },
    removeFromCart: (state, action) => {
      //it check  how many item are their in cart and it reduces its quantity by 1
      const removeItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === removeItem);
      if (existingItem?.quantity === 1) {
        state.cart = state.cart.filter((item) => item?._id !== removeItem);
      } else {
        state.cart = state.cart.map((item) =>
          item._id === removeItem
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    },
  },
});
export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
