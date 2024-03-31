import { createContext, useState } from "react"
import  axiosClient  from "../Axios/axios"

export const ProdcuContext = createContext()
export default function ProductProvider({children}) {
  const [product,setProd] = useState([])
  const [categs,setCategs] = useState([])
  const [info,setInfo] =useState('')
   const getAllProducts = async ()=> {

  const response =  await axiosClient.get('/product')
  if(response.status === 200){
        setProd(response.data.products)
      if(response.data.products.length === 0) {
        setInfo("you don't have any product yet")
      }else{
        setProd(response.data.products)
        setInfo('')
      }
     }
    
     
}

const getAllCategs =async()=>{
  const Categorys =await axiosClient.get('/category');
  setCategs(Categorys.data.categorys)
}
 const removeCateg=async(id)=>{
    const restCatges = categs.filter((item)=>item.id!==id)
    console.log(restCatges)
    setCategs(restCatges)
    try{
      await axiosClient.delete('/category/'+id)
    }catch (err){
      console.log(err)
    }finally{
        getAllCategs()
    }
   
  }
 const removeProd =async(id)=>{
    const restPprods = product.filter((item)=>item.id!==id)
    setProd(restPprods)
    try{
      await axiosClient.delete('/product/'+id)
    }catch (err){
      console.log(err)
    }finally{
        getAllProducts()
    }
   
  }

  return (
    <ProdcuContext.Provider value={{product,setProd,getAllProducts,info,removeProd,categs,removeCateg,getAllCategs}}
    >{children}
    </ProdcuContext.Provider>
  )
}
