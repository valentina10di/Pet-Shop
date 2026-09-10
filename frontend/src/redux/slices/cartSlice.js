import { createSlice } from "@reduxjs/toolkit";
import { sendCartOrder } from "../thunks/cartThunks";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage", error);
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {
    items: loadCartFromStorage(),
    status: "idle",
    responseMessage: null,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ ...product, count: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    incrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.count += 1;
      }
      saveCartToStorage(state.items);
    },
    decrementCount: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendCartOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.responseMessage = null;
      })
      .addCase(sendCartOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.responseMessage = action.payload.message;
        state.items = [];
        saveCartToStorage(state.items);
      })
      .addCase(sendCartOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementCount,
  decrementCount,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
