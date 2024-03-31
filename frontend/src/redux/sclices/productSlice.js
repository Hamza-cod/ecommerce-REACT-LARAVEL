import { createSlice } from "@reduxjs/toolkit";
import globalState from "../state";
// console.log(iniState)
export const ProductSlice = createSlice({
  name:'product',
  initialState:globalState,
  reducers:{
    setProducts:(state,{payload = []})=>{
      return {...state,products:payload}
    },
    removeProduct:(state,{payload = null})=>{
      return {...state,products:[...state.products.filter(item=>item.id!== payload)]}
    }
  }
})
export const {setProducts,removeProduct}=ProductSlice.actions;
export default ProductSlice.reducer;