import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  bookId: string;
  name: string;
  thumbImage: string;
  price: number;
  discountedPrice: number;
  quantity: number;
}

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addOrUpdateCartItem(state, action: PayloadAction<ICartItem>) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookId === action.payload.bookId
      );

      if (existingItemIndex !== -1) {
        // Update the existing item with the new quantity
        state.items[existingItemIndex].quantity = action.payload.quantity;
      } else {
        // Add new item to cart
        state.items.push(action.payload);
      }
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.bookId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addOrUpdateCartItem, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
