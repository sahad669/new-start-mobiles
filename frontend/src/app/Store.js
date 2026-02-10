import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import categoryReducer from "../features/categorySlice";
import brandReducer from "../features/brandSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
  },
});
