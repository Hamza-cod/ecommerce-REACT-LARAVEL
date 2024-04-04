import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminDashn from "../Layout/AdminDash";
import GestLogin from "../Layout/GestLogin";
import AddProduct from "../components/admin/AddProduct";
import AddCategory from "../components/admin/AddCategory";
import AllCategorys from "../components/admin/AllCategorys";
import UpdateProduct from "../components/admin/UpdateProduct";
import UpdateCategory from "../components/admin/UpdateCategory";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import AllProducts from './../components/admin/AllProducts';
import OrdersList from "../components/admin/OrdersList";

const router = createBrowserRouter([
    {
      element:<Layout/>,
      children :[
          { path:'/',element:<Home/>},
          { path:'product/:id',element:<ProductDetails/>},
          { path:'*',element:<h1 className="h-[50vh] mt-11 bg-blue-400">not found</h1>},
           
      ]
    },
    { path:'/order/:id',element:<Checkout/>}
    ,{
      element:<GestLogin/>,
      children:[
         { path:'/login/admin',element:<Login/>},
      ]
    }
    ,{
      element:<AdminDashn/>,
      children:[
           { path:'/dashboard',element:<Dashboard/>},
          { path:'/dashboard/all_products',element:<AllProducts/>},
          { path:'/dashboard/all_categorys',element:<AllCategorys/>},
          { path:'/dashboard/add_products',element:<AddProduct/>},
          { path:'/dashboard/add_categorys',element:<AddCategory/>},
          { path:'/dashboard/product/:id/update',element:<UpdateProduct/>},
          { path:'/dashboard/category/:id/update',element:<UpdateCategory />},
          { path:'/dashboard/orders',element:<OrdersList />},
          { path:'/dashboard/*',element:<div className="mt-9">Not Found</div>},
      ]
    }
])
export default router