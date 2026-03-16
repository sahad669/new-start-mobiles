import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import categoryReducer from "../features/categorySlice";
import brandReducer from "../features/brandSlice";
import productReducer from "../features/productSlice"
import cartReducer from "../features/cartSlice"
import addressReducer from "../features/addressSlice"
export const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    product:productReducer,
    cart:cartReducer,
    address:addressReducer
  },
});
