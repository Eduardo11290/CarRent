import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { id, startDate, endDate, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) {
        state.items.push({ 
            ...action.payload, 
            quantity: quantity || 1,
            startDate: startDate || 'Neselectat',
            endDate: endDate || 'Neselectat'
        });
      } else {
        existingItem.quantity = quantity;
        existingItem.startDate = startDate;
        existingItem.endDate = endDate;
      }
    },

    removeItem: (state, action) => {
      const idToRemove = action.payload.id || action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;

        if (item.startDate && item.startDate !== 'Neselectat') {
            const start = new Date(item.startDate);
            start.setDate(start.getDate() + quantity);
            
            // Formatăm noua dată ca YYYY-MM-DD
            item.endDate = start.toISOString().split('T')[0];
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;