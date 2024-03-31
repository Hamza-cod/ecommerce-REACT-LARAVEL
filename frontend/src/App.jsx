import { RouterProvider } from 'react-router-dom'

import router from './Router'
 
import {  useDispatch } from 'react-redux'

import { useEffect } from 'react'
import { ProductsApi } from './Api/products'
import { setProducts } from './redux/sclices/productSlice'
import { CategoriesApi } from './Api/categories'
import { setCategories } from './redux/sclices/categorySlice'
function App() {
  const dispate = useDispatch()
  useEffect(()=>{
    const  getProducts = async ()=>{
      
      const {data}= await ProductsApi.getAllProducts();
      const {data : categories}= await CategoriesApi.getAllCategories();
      // console.log(data)
      dispate(setProducts(data.products))
      dispate(setCategories(categories.categorys))
     
    }
    getProducts();
  },[])
 
  return (
      <RouterProvider router={router}/>
  )
}

export default App
