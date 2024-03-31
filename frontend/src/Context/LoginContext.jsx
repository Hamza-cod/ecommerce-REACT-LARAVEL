import { createContext, useState } from "react";
import  axiosClient  from "../Axios/axios";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext()

const LoginProvider =({children })=> {
  const [ User ,setUser ] =useState({})
  const [ authorized ,setAuthorized ] =useState(localStorage.getItem('access_token')  );
  const logout = async ()=>{
    setAuthorized(null)
    setUser({})
    localStorage.removeItem('access_token')
    await axiosClient.post('/logout')
  }
  // console.log()
  return <LoginContext.Provider value={{User,setUser,authorized,setAuthorized,logout}}>
      {children}
    </LoginContext.Provider>
  
}

export default LoginProvider;