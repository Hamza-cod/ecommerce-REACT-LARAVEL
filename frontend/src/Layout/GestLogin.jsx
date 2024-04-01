import { useContext, useEffect, useState,  } from "react";
import {  Outlet, useNavigate,  } from "react-router-dom";
import axiosClient  from "../Axios/axios";
import { useSelector } from "react-redux";
import { loginSeletore } from "../redux/selectors";
export default function GestLogin() {
  const navigate = useNavigate()

    const [setLoading] = useState(true)
    const {accessToken: authorized} = useSelector(loginSeletore)
   
useEffect(() => {
        if(authorized){
          navigate('/dashboard')
        }
  },[]);
  return (
    <>
      <div className="fixed flex w-full justify-center items-center top-0 h-9 bg-transparent p-6">
       <div className="text-xl font-bold uppercase text-white">admin</div>
      </div>
      <div className="h-screen">
        <Outlet/>
      </div>
      
    </>
  )
}
