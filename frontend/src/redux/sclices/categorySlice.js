import { createSlice } from "@reduxjs/toolkit";
import globalState from "../state";
export const categrySlice = createSlice({
  name:'category',
  initialState:globalState,
  reducers:{
    setCategories:(state,{payload = []})=>{
      return {...state,categories:payload}
    },
    removeCategory:(state,{payload = null})=>{
      return {...state,categories:[...state.categories.filter(item=>item.id!== payload)]}
    }
  } 
})
export const {setCategories,removeCategory}=categrySlice.actions;
export default categrySlice.reducer;