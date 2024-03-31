import {  useEffect, useRef, useState } from "react"
import  axiosClient  from "../Axios/axios"
import { useDispatch, useSelector } from "react-redux"
import { categoriesSelectore } from "../redux/selectors"
import { setCategories } from "../redux/sclices/categorySlice"
import { CategoriesApi } from "../Api/categories"

export default function AddProduct() {


  const nameRef = useRef()
  const descRef = useRef()
  const priceRef = useRef()
  const CategRef = useRef()
  const ImageRef = useRef()
  const [loading,setLoadin] = useState(false)
  const [err,setErr] = useState('')
  const [message,setMessage] = useState('')
  const categries = useSelector(categoriesSelectore)  
  const dispatch = useDispatch()


  const SendData = async (data)=>{
     try{
      setLoadin(true) 
      await axiosClient.post('/product',data,)
       .then(
        (response)=>{
          console.log(response)
          if(response.data.status ===1){
        nameRef.current.value =""
        descRef.current.value =""
        priceRef.current.value =""
        ImageRef.current.value =null
        setErr("")
        setMessage('added')
        displayMessage()
       }}
       )
       .catch(({response})=>{setErr(response.data.message)})
       
     }catch{
       ()=>{
        console.log('error');
       }
     }finally{
      setLoadin(false)
     }
  }

const displayMessage=()=>{
  setTimeout(() => {
    setMessage('')
  }, 2000);
}

const handelSubmit =(e)=>{
  e.preventDefault()
   const formData = {
  'name': nameRef.current.value,
  'description': descRef.current.value,
  'price': priceRef.current.value,
  'image': ImageRef.current.files[0],
  'category_id': CategRef.current.value,}
  console.log(formData)
  SendData(formData)
  
}

useEffect(()=>{
  (async ()=>{
     const {data}= await CategoriesApi.getAllCategories();
     dispatch(setCategories(data));
     })
},[])

  return (
    <div className="w-3/4 mx-auto p-3 bg-slate-50/40 shadow-md my-5 addProdt">
       {err && <div className="text-red-500 text-center w-full">{err}</div>}
      <div className={`text-green-400 font-bold mx-auto fixed top-[200px]
       ${message?'opacity-1 right-4':'opacity-0 -right-full'} transition-all duration-400  text-center w-[400px] px-3 py-3 bg-slate-50/90 rounded-md`}>Product Added sucssefully</div>
      <form onSubmit={handelSubmit} method="POST" encType="multipart/form-data">
      <div className=" w-[90%] flex flex-col gap-4 p-5 mx-auto ">
      <div className="w-full p-2 flex flex-col gap-2 ">
      <label htmlFor="name">Product Name</label>
      <input type="text" name="" id=""  ref={nameRef}/>
        </div>
      <div className=" w-full p-2 flex flex-col gap-2 ">
      <label htmlFor="descrip">Product Description</label>
      <input type="text" name="" id="" ref={descRef} />
     </div>
     <div className=" w-full p-2 flex flex-col gap-2 ">
      <label htmlFor="categ">Categorus</label>
      <select id="categ" ref={CategRef}>
        <option value="">Select Category</option>
        {
          categries.map((item)=>(
            <option key={item.id} value={item.id}>{item.name}</option>
          ))
        }
      </select>
      </div>
      <div className=" w-full p-2 flex justify-between gap-4 ">
        <div className="flex flex-col  gap-3  ">
      <label htmlFor="Price">Price (DH)</label>
      <input type="text" min={1} name="" id="" ref={priceRef} />
      </div>
        <div className="flex flex-col  gap-3  ">
      <label htmlFor="image">image</label>
      <input type="file" id="image" ref={ImageRef} accept="image/*" />
        </div>
       </div>
         {err && <div className="text-red-500 text-center w-full">{err}</div>}
      <button className="p-3 bg-blue-400 hover:bg-blue-300 transition duration-300 text-xl rounded-md w-[300px]
      my-3 mx-auto"
      type="submit">
        {loading?'adding...':'add'}
      </button>
      </div>
    </form>
    </div>
  )
}
