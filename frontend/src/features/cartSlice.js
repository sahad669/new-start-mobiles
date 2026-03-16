import { createSlice } from "@reduxjs/toolkit";

// 🟢 Load cart from localStorage
const cartFromStorage = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: cartFromStorage,
  },

  reducers: {
    // 🟡 ADD PRODUCT TO CART
    addProductToCart: (state, action) => {
      const item = action.payload;

      // 🔎 Check if SAME product + SAME variant already exists
      const existingItem = state.items.find(
        (i) =>
          i.id === item.id &&
          i.variant?.color === item.variant?.color &&
          i.variant?.storage === item.variant?.storage &&
          i.variant?.ram === item.variant?.ram
      );

      if (existingItem) {
        // ➜ Increase quantity
        existingItem.qty += item.qty || 1;
      } else {
        // ➜ Add new item
        state.items.push({
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          variant: item.variant,
          qty: item.qty || 1,
        });
      }

      // 💾 Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🔴 REMOVE ONE ITEM (by id + variant)
    removeCartItem: (state, action) => {
      const { id, variant } = action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.id === id &&
            item.variant?.color === variant?.color &&
            item.variant?.storage === variant?.storage &&
            item.variant?.ram === variant?.ram
          )
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🟠 UPDATE QUANTITY
    updateQty: (state, action) => {
      const { id, variant, qty } = action.payload;

      const item = state.items.find(
        (i) =>
          i.id === id &&
          i.variant?.color === variant?.color &&
          i.variant?.storage === variant?.storage &&
          i.variant?.ram === variant?.ram
      );

      if (item) {
        item.qty = qty > 0 ? qty : 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🟣 INCREASE QTY BUTTON
    increaseQty: (state, action) => {
      const { id, variant } = action.payload;

      const item = state.items.find(
        (i) =>
          i.id === id &&
          i.variant?.color === variant?.color &&
          i.variant?.storage === variant?.storage &&
          i.variant?.ram === variant?.ram
      );

      if (item) item.qty += 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🔵 DECREASE QTY BUTTON
    decreaseQty: (state, action) => {
      const { id, variant } = action.payload;

      const item = state.items.find(
        (i) =>
          i.id === id &&
          i.variant?.color === variant?.color &&
          i.variant?.storage === variant?.storage &&
          i.variant?.ram === variant?.ram
      );

      if (item && item.qty > 1) item.qty -= 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    // 🧹 CLEAR ENTIRE CART
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const {
  addProductToCart,
  removeCartItem,
  updateQty,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;