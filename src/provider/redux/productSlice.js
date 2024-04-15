import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    pillow: null,
    cushion: null,
    bolster: null,
    mattress: null,
  },
  reducers: {
    addPillows: (state, action) => {
      state.pillow = action.payload;
    },
    addCushions: (state, action) => {
      state.cushion = action.payload;
    },
    addBolsters: (state, action) => {
      state.bolster = action.payload;
    },
    addMattresses: (state, action) => {
      state.mattress = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { addBolsters, addCushions, addMattresses, addPillows } =
  productSlice.actions;
