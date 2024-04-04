import { createSlice } from "@reduxjs/toolkit";
import globalState from "../state";
export const ordersSlice = createSlice({
  name:'category',
  initialState:globalState,
  reducers:{
    setOrders:(state,{payload = []})=>{
      return {...state,orders:payload}
    },
    
  } 
})
export const {setOrders}=ordersSlice.actions;
export default ordersSlice.reducer;