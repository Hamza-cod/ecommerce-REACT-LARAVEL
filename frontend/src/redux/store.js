import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./sclices/loginSlice";
import productSlice from "./sclices/productSlice";
import categorySlice from "./sclices/categorySlice";

const store = configureStore(
  {reducer :{
    login:loginSlice,
    products:productSlice,
    categories:categorySlice,
  }}
)
export default store;