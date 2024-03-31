import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { LuLogOut } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { loginSeletore } from "../redux/selectors";
import axiosClient from "../Axios/axios";
import { logout, setUser } from "../redux/sclices/loginSlice";
import { AdminApi } from "../Api/admin";

export default function AdminDashn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {accessToken,user: User} = useSelector(loginSeletore)
  const dispatch = useDispatch()

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
            navigate("/login/admin");
            if (response.status === 401) {
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

  return (
    <>
      <header className="fixed w-full bg-gray-400/90 py-4  ">
        <div className="flex justify-around items-center z-20 blur-none ">
          <ul className=" flex gap-6 text-md font-semibold text-white">
            <li>
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/dashboard/add_products"}>Add Product</Link>
            </li>
            <li>
              <Link to={"/dashboard/all_products"}>All Products</Link>
            </li>
            <li>
              <Link to={"/dashboard/add_categorys"}>Add Category</Link>
            </li>
            <li>
              <Link to={"/dashboard/all_categorys"}>All Categs</Link>
            </li>
          </ul>

          <div className="text-white flex justify-between items-center">
            <span className="mx-3 font-semibold"> Admin : {User.name}</span>
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
      </header>
      <div className="bg-gradient-to-r min-h-screen  py-[90px] from-gray-900 text-white to-black px-6 flex flex-col justify-start items-center">
        <Outlet />
      </div>
    </>
  );
}
