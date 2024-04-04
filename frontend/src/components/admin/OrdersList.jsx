import { useEffect, useState } from "react";
import axiosClient from "../../Axios/axios"
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../redux/sclices/ordersSlice";
import { ordersSelectore } from "../../redux/selectors";

function OrdersList() {
  // const [orders,setOrders] = useState([])
   const orders = useSelector(ordersSelectore)
   console.log(orders)
  const dispatche = useDispatch()
  const getOrdersList = async()=>{
       const {data} = await axiosClient.get('/order');
      //  setOrders(data)
      dispatche(setOrders(data))

  }
useEffect(()=>{
  getOrdersList()
},[])
  
  return (
    <div className="my-8 text-center max-w-full ">
    <div className="text-xl  font-bold ">All Orders</div>
    <table className="w-[100%]  my-5 ">
      <tr className="border-b ">
      <th className="px-6 ">Name</th>
      <th className="px-6 ">email</th>
      <th className="px-6 ">phone</th>
      <th className="px-6 ">product name</th>
      <th className="px-6 ">product image</th>
      <th className="px-6 ">total</th>
      </tr>
     {
      orders?.slice(0,20).map((order)=>{
        return<tr key={order.id} className="p-3 border-b  border-white">
      <td className="px-6  ">{order.name}</td>
      <td className="px-6  ">{order.email}</td>
      <td className="px-6  ">{order.phone}</td>
      <td className="px-6  ">{order.product.name}</td>
      <td className="px-6  ">
                <img src={`${import.meta.env.VITE_BANCKEND_URL}/storage/${order.product.image}`} className="h-[50px]"  alt={order.product.name} />
      </td>
      <td className="px-6 ">{order.total} $</td>
      <td className="my-4 flex justify-center items-center gap-3">
       
        </td>
      </tr>
      })
     }
    </table>
  </div>
  )
}

export default OrdersList