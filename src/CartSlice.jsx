// src/redux/CartSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // holds all cart items
  },

  reducers: {
    // ✅ Add item to cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        // If already exists, just increase quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add new item with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ Remove item from cart
    removeItem: (state, action) => {
      // The payload is the item name (string)
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },

    // ✅ Update item quantity
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// ✅ Export action creators to use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// ✅ Export reducer as default to use in store.js
export default cartSlice.reducer;
