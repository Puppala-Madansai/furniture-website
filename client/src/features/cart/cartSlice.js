import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, customization } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product === product && 
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          customization,
        });
      }

      // Update total
      state.total = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.product === action.payload.product &&
        JSON.stringify(item.customization) === JSON.stringify(action.payload.customization)
      );

      if (index !== -1) {
        state.items.splice(index, 1);
      }

      // Update total
      state.total = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    updateQuantity: (state, action) => {
      const { product, quantity, customization } = action.payload;
      const item = state.items.find(
        (item) => item.product === product &&
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (item) {
        item.quantity = quantity;
      }

      // Update total
      state.total = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer; 