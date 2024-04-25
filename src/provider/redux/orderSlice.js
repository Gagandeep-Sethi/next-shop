import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    address: {},
  },
  reducers: {
    addOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders = [...state.orders, ...newOrder];
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

export const { addOrder, addAddress } = orderSlice.actions;
export default orderSlice.reducer;
