import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Products/ProductSlice";
const Store = configureStore({
  reducer: {
    Products: ProductReducer,
  },
});
export default Store;
