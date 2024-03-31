import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminDashn from "../Layout/AdminDash";
import GestLogin from "../Layout/GestLogin";
import AllProducts from "../components/AllProducts";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import AllCategorys from "../components/AllCategorys";
import UpdateProduct from "../components/UpdateProduct";
import UpdateCategory from "../components/UpdateCategory";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";

const router = createBrowserRouter([
    {
      element:<Layout/>,
      children :[
          { path:'/',element:<Home/>},
          { path:'product/:id',element:<ProductDetails/>},
          { path:'/order/:id',element:<Checkout/>},
          { path:'*',element:<h1 className="h-[50vh] mt-11 bg-blue-400">not found</h1>},
           
      ]
    }
    ,{
      element:<GestLogin/>,
      children:[
         { path:'/login/admin',element:<Login/>},
      ]
    }
    ,{
      element:<AdminDashn/>,
      children:[
           { path:'/',element:<Dashboard/>},
          { path:'/dashboard/all_products',element:<AllProducts/>},
          { path:'/dashboard/all_categorys',element:<AllCategorys/>},
          { path:'/dashboard/add_products',element:<AddProduct/>},
          { path:'/dashboard/add_categorys',element:<AddCategory/>},
          { path:'/dashboard/product/:id/update',element:<UpdateProduct/>},
          { path:'/dashboard/category/:id/update',element:<UpdateCategory />},
          { path:'/dashboard/*',element:<div className="mt-9">Not Found</div>},
      ]
    }
])
export default router