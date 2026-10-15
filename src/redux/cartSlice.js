import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "mystore_carts";

function readCartStorage() {
  try {
    return (
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || {}
    );
  } catch {
    return {};
  }
}

const initialState = {
  cartsByUser: readCartStorage(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ADD PRODUCT
    addToCart: (state, action) => {
      const {
        userId,
        product,
      } = action.payload;

      const key = String(
        userId || "guest"
      );

      if (!state.cartsByUser[key]) {
        state.cartsByUser[key] = [];
      }

      const cart =
        state.cartsByUser[key];

      const existingItem =
        cart.find(
          (item) =>
            String(item.id) ===
            String(product.id)
        );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }
    },

    // REMOVE PRODUCT
    removeFromCart: (
      state,
      action
    ) => {
      const {
        userId,
        id,
      } = action.payload;

      const key = String(
        userId || "guest"
      );

      const cart =
        state.cartsByUser[key] || [];

      state.cartsByUser[key] =
        cart.filter(
          (item) =>
            String(item.id) !==
            String(id)
        );
    },

    // INCREASE QUANTITY
    increaseQuantity: (
      state,
      action
    ) => {
      const {
        userId,
        id,
      } = action.payload;

      const key = String(
        userId || "guest"
      );

      const cart =
        state.cartsByUser[key] || [];

      const item =
        cart.find(
          (product) =>
            String(product.id) ===
            String(id)
        );

      if (item) {
        item.quantity += 1;
      }
    },

    // DECREASE QUANTITY
    decreaseQuantity: (
      state,
      action
    ) => {
      const {
        userId,
        id,
      } = action.payload;

      const key = String(
        userId || "guest"
      );

      const cart =
        state.cartsByUser[key] || [];

      const item =
        cart.find(
          (product) =>
            String(product.id) ===
            String(id)
        );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartsByUser[key] =
          cart.filter(
            (product) =>
              String(product.id) !==
              String(id)
          );
      }
    },

    // CLEAR CURRENT USER CART
    clearCart: (
      state,
      action
    ) => {
      const userId =
        action.payload;

      const key = String(
        userId || "guest"
      );

      state.cartsByUser[key] = [];
    },

    // SET COMPLETE CART OBJECT
    // Example:
    // {
    //   user1: [...],
    //   user2: [...],
    //   guest: [...]
    // }
    setCarts: (
      state,
      action
    ) => {
      state.cartsByUser =
        action.payload || {};
    },

    // SET ONE USER'S CART
    setUserCart: (
      state,
      action
    ) => {
      const {
        userId,
        cart,
      } = action.payload;

      const key = String(
        userId || "guest"
      );

      state.cartsByUser[key] =
        cart || [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCarts,
  setUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;