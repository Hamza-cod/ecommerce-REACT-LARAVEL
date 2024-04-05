import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./sclices/loginSlice";
import productSlice from "./sclices/productSlice";
import categorySlice from "./sclices/categorySlice";
import ordersSlice from "./sclices/ordersSlice";
import dashboardSlice from "./sclices/dashboardSlice";

const store = configureStore(
  {reducer :{
    login:loginSlice,
    products:productSlice,
    categories:categorySlice,
    orders:ordersSlice,
    dashboard:dashboardSlice,
    
  }}
)
export default store;