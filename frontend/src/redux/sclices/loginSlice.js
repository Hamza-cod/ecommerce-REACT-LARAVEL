import { createSlice } from "@reduxjs/toolkit";
import globalState from "../state";
export const loginSlice = createSlice({
  name:'login',
  initialState:globalState,
  reducers:{
    login:(state)=>{
      return {...state,login:true}
    },
    logout:(state)=>{
    localStorage.removeItem('access_token');
    return {...state,login:{user:{}}}
    },
    setUser:(state,{payload })=>{
      return {...state,login: {
      ...state.login,
      user: payload
    }}
    }
  }
})
export const {login,logout,setUser}=loginSlice.actions;
export default loginSlice.reducer;