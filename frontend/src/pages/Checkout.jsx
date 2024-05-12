import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productsSelectore } from "../redux/selectors";
import { useEffect, useRef, useState } from "react";
import { ProductsApi } from "../Api/products";
import axiosClient from "../Axios/axios";

const Checkout = () => {
  const { id } = useParams();
  const emailRef = useRef();
  const nameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const [product,setProduct] = useState(null)
  const [isNotFound,setIsNotFound]  = useState(false)
  const [ordred,setOrdred]  = useState(false)
  const navigate= useNavigate()
const sendData = async (orderData) =>{
   const data  =  await axiosClient.post('/order',orderData).catch((err)=>{
    console.log(err);
   })
   if(data.status === 200)
   {
     setOrdred(true)
     setTimeout(() => {
      navigate('/')
     }, 800);
   }
}

const handelSubmit = (e)=>{
      e.preventDefault()
     const data = {
         'name' : nameRef.current.value,
        'phone':phoneRef.current.value,
        'email':emailRef.current.value,
        'address':addressRef.current.value,
        'product_id' : id,
        'total':product.price+8, 
        'quantity':1,
     } 
     console.log(data)
     sendData(data)
  }

const getSelectedProduct = async()=>
 {
      const {data} = await ProductsApi.getOneProduct(id).catch(({response})=>{
       if(response.status === 404)
       {
            setIsNotFound(true);
       }
      });
      setProduct(data.product)
 }
useEffect(()=>{
  getSelectedProduct()
},[])

if(isNotFound){
  return <div>
    not found
  </div>
}
if(ordred)
{
  return <div>
    ordred 
  </div>
}
if(!product)
{
  return (
    <div className=" w-full flex justify-center items-center py-3 px-96">
    <div class="animate-pulse flex flex-col justify-center w-full items-center gap-4 ">
  <div>
    <div class="w-full h-6 bg-slate-400 rounded-md"></div>
    <div class=" w-full h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
  </div>
  <div class="h-7 bg-slate-400 w-full rounded-md"></div>
  <div class="h-7 bg-slate-400 w-full rounded-md"></div>
  <div class="h-7 bg-slate-400 w-full rounded-md"></div>
  <div class="h-7 bg-slate-400 w-1/2 rounded-md"></div>
</div>
    </div>
  )
}

  let { image, price, name: title } = product;  

  return (
      <div className="p-4 grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src={import.meta.env.VITE_BANCKEND_URL + "/storage/" + image}
                alt={title}
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">{title}</span>
                <span className="float-right text-gray-400">
                  {product?.category?.name}
                </span>
                <p className="text-lg font-bold">${price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Order Details</p>
          <p className="text-gray-400">
            Complete your order by providing your information.
          </p>
          <form onSubmit={handelSubmit}>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="phone"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="phone"
                ref={phoneRef}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="06/07 0000...."
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                ref={nameRef}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  ref={addressRef}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder=" Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">${price}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${price+8}
              </p>
            </div>
          <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Order Now
          </button>
          </form>
        </div>
   </div>
);
  
};

export default Checkout;
