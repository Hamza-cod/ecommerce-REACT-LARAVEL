
import { Link } from "react-router-dom"
import { MdDeleteForever } from "react-icons/md";
import {  FaRegEye } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { productsSelectore } from "../../redux/selectors";
import { useEffect, useState } from "react";
import { removeProduct, setProducts } from "../../redux/sclices/productSlice";
import { ProductsApi } from "../../Api/products";
export default function AllProducts() {
  const products  = useSelector(productsSelectore)
  const dispatch = useDispatch()
  const [info,setInfo]= useState(false)
  // console.log(products);
  const  getProducts = async ()=>{
      const {data}= await ProductsApi.getAllProducts();
      if(data.products.length<1){
        setInfo(true)
      }
      dispatch(setProducts(data.products))
  }
   useEffect(() => {
    getProducts()
 }, []);
 if (info){
      return <div>No products yet</div>
    }else if(products.length ===0){
   return <div>
      Loading ...
    </div>
  }
  

 
  return (
  <div className="my-8 text-center ">
    <div className="text-xl  font-bold ">AllProducts</div>
    <table className="w-[100%] mx-auto t my-5 ">
      <tr className="border-b ">
      <th className="px-6 ">Name</th>
      <th className="px-6 ">Image</th>
      <th className="px-6 ">description</th>
      <th className="px-6 ">price (dh)</th>
      <th className="px-6 ">ACATIONS</th>
      </tr>
     {
      products?.slice(0,20).map((product)=>{
        return<tr key={product.id} className="p-3 border-b  border-white">
      <td className="px-9  ">{product.name}</td>
      <td className="  p-2">
        <img src={`${import.meta.env.VITE_BANCKEND_URL}/storage/${product.image}`} className="h-[50px]"  alt={product.name} />
        </td>
      <td className="px-9  ">{product.description.slice(0,40)}...</td>
      <td className="px-9 ">{product.price} dh</td>
      <td className="my-4 flex justify-center items-center gap-3">
        <button onClick={async ()=>{
          dispatch(removeProduct(product.id))
          await ProductsApi.removeProduct(product.id)
          }} className="p-2 bg-red-400 rounded-md">
           <MdDeleteForever style={{fontSize:"20px"}} />
        </button>
        <Link to={`/dashboard/product/${product.id}/update`} className=" w-max p-2 bg-blue-400 rounded-md mx-4">
           <MdEditDocument style={{fontSize:"20px"}}/>
        </Link>
        <Link to={`/product/${product.id}/`} target="_blank" className=" w-max p-2 bg-blue-400 rounded-md mx-4">
           <FaRegEye style={{fontSize:"20px"}}/>
        </Link>
        </td>
      </tr>
      })
     }
    </table>
  </div>
  )
   
}
