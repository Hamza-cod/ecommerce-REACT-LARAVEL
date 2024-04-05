import { createSlice } from "@reduxjs/toolkit";
import globalState from "../state";
export const dashboardSlice = createSlice({
  name:'category',
  initialState:globalState,
  reducers:{
    setDashboard:(state,{payload })=>{
      return {...state,dashboard:payload}
    },
    
  } 
})
export const {setDashboard}=dashboardSlice.actions;
export default dashboardSlice.reducer;