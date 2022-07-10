import { configureStore } from "@reduxjs/toolkit";
import { cartSliceReducer } from "./cart-slice";
import { UISliceReducer } from "./ui-slice";

const store = configureStore({
  reducer: {
    UIReducer: UISliceReducer,
    CartReducer: cartSliceReducer,
  },
});

export default store;
