import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingItem = state.products.find(product => product._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }

      state.total += action.payload.price * action.payload.quantity;
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(product => product._id === action.payload);
      if (item) {
        item.quantity++;
        state.total += item.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(product => product._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.total -= item.price;
      }
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload);
      if (index !== -1) {
        state.total -= state.products[index].price * state.products[index].quantity;
        state.products.splice(index, 1);
      }
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
