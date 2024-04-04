import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { LuLogOut } from "react-icons/lu";
import { FaChartBar,FaList } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import {  RiPlayListAddLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { loginSeletore } from "../redux/selectors";
import axiosClient from "../Axios/axios";
import { logout, setUser } from "../redux/sclices/loginSlice";
import { AdminApi } from "../Api/admin";
import Navbar from "../components/admin/dashboard/Navbar";

export default function AdminDashn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {accessToken,user: User} = useSelector(loginSeletore)
  const dispatch = useDispatch()
   const navContent = [
   {
    path :'/dashboard',
    icon:<FaChartBar className="text-2xl" />,
    name:'dashboard'

   },
   {
    path :'/dashboard/orders',
    name:'Orders',
    icon:<FiBell className="text-2xl" />
   },
   {
    path :'/dashboard/add_categorys',
    name:'Add Categories',
     icon :<TbCategoryPlus className="text-2xl"/>
   },
   {
    path :'/dashboard/add_products',
    name:'Add Product',
     icon :<RiPlayListAddLine className="text-2xl"/>
   },
   {
    path :'/dashboard/all_products',
    name:'All Products',
    icon :<FaList className="text-2xl"/>
   },
   {
    path :'/dashboard/all_categorys',
    name:'All Categoiers',
     icon :<BiCategoryAlt className="text-2xl"/>
   },
   
 ]
 const [filtredNav , setFiltredNav ]= useState(navContent)


  useEffect(() => {
   
    const getUsers = async () => {
      if (accessToken !== null) {
        await axiosClient
          .get("/api/user")
          .then((response) => {
            dispatch( setUser(response.data));
            setLoading(false);
          })
          .catch(({ response }) => {
            if (response.status === 401) {
              navigate("/login/admin");
              localStorage.removeItem("access_token");
            }
          });
      }else  {
      setLoading(true);
      navigate("/login/admin");
    }
    };
    getUsers();
  }, []);
  // console.log(accessToken)
  if (loading) {
    return <></>;
  }

 const filterNav = (text)=>{
  if(text!==""){
    const newNav = navContent.filter(item=>item.name.toLocaleLowerCase().includes(text.trim().toLowerCase()));
    setFiltredNav(newNav);
    
  }
 }
  return (
    <>
    <div className="flex flex-1 bg-gray-800 max-w-full min-h-screen">
    <div className=" md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5  bg-gray-900">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1>ADMIN </h1>
            </div> 
            <div className="pb-4 mt-8">
                    <div className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-white transition-all duration-200 rounded-lg ">
                        <img className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png" alt="" />
                       {User.name}
                        <button
              onClick={() => {
               const logoutFn = async()=> await AdminApi.logout();
                logoutFn()
                console.log('log out from')
               dispatch(logout());
                navigate("/login/admin");
              }}
              className="px-4 flex justify-center items-center
             py-2 bg-blue-400 rounded-lg hover:bg-blue-200 transition duration-300"
            >
              <LuLogOut className="mx-1 " /> logout
            </button>
                    </div>
            </div>
            
            <div className="px-4 mt-3">
                <label  className="sr-only"> Search </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                    <input type="search" onChange={(e)=>filterNav(e.target.value)} className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                </div>
            </div>

            <div className="px-4 mt-6">
                <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <Navbar navContent={filtredNav}/>
                </div>
            </div>
        </div>
    </div>

    <div className="flex flex-col flex-1">
        <main>
            <div className="py-6">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8   flex items-center justify-center text-white ">
                    {/* <!-- ADD YOUR CONTENT HERE --> */}
                    <Outlet/>
                </div>
            </div>
        </main>
    </div>
</div>
    </>
  );
}
