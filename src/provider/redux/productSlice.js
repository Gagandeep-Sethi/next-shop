import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    pillows: null,
    cushions: null,
    bolsters: null,
    mattresses: null,
  },
  reducers: {
    addPillows: (state, action) => {
      state.pillows = action.payload;
    },
    addCushions: (state, action) => {
      state.cushions = action.payload;
    },
    addBolsters: (state, action) => {
      state.bolsters = action.payload;
    },
    addMattresses: (state, action) => {
      state.mattresses = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { addBolsters, addCushions, addMattresses, addPillows } =
  productSlice.actions;
