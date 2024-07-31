import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Record<number, number>;
}

interface SetItemPayload {
    id: number;
    amount: number;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId]++;
      } else {
        state.items[itemId] = 1;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId]--;
        if (state.items[itemId] === 0) {
          delete state.items[itemId];
        }
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
        const itemId = action.payload
        if (state.items[itemId]) {
          delete state.items[itemId];
        }
    },
    setItemAmount: (state, action: PayloadAction<SetItemPayload>) => {
        const { id: itemId, amount } = action.payload
        if (state.items[itemId]) {
          if (amount === 0) {
            delete state.items[itemId]
          } else {
            state.items[itemId] = amount
          }  
        }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
  selectors: {
    selectCartItems: cart => cart.items
  }
});

export const { addItem, removeItem, deleteItem, setItemAmount, clearCart } = cartSlice.actions

export const { selectCartItems } = cartSlice.selectors

export default cartSlice
