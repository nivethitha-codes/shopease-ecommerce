import { createSlice } from "@reduxjs/toolkit";

const getCartKey = (userId) => (userId ? `cart_${userId}` : "cart_guest");

const getUserInfoFromStorage = () => {
  const userInfo = localStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};

const loadCartForUser = (userId) => {
  const stored = localStorage.getItem(getCartKey(userId));
  return stored
    ? JSON.parse(stored)
    : { cartItems: [], shippingAddress: {}, paymentMethod: "COD" };
};

const initialUserInfo = getUserInfoFromStorage();
const loadedCart = loadCartForUser(initialUserInfo?._id);

const initialState = {
  ...loadedCart,
  userId: initialUserInfo?._id || null,
};

const addDecimals = (num) => Math.round(num * 100) / 100;

const updateCart = (state) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem(
    getCartKey(state.userId),
    JSON.stringify({
      cartItems: state.cartItems,
      shippingAddress: state.shippingAddress,
      paymentMethod: state.paymentMethod,
    })
  );
  return state;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
    // Called on login/logout — switches to that user's saved cart (or guest cart if userId is null)
    loadUserCart: (state, action) => {
      const userId = action.payload;
      const loaded = loadCartForUser(userId);
      state.cartItems = loaded.cartItems;
      state.shippingAddress = loaded.shippingAddress;
      state.paymentMethod = loaded.paymentMethod;
      state.userId = userId || null;
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  loadUserCart,
} = cartSlice.actions;
export default cartSlice.reducer;