import {  useEffect  } from "react"
import DisplayProd from "../components/DisplayProd"
import { ProductsApi } from './../Api/products';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/sclices/productSlice";
import { productsSelectore } from "../redux/selectors";


export default function Home() {
  const products = useSelector(productsSelectore)
  const dispatch= useDispatch()
   const getAllProducts =async()=>{
      const {data} = await ProductsApi.getAllProducts()
      dispatch(setProducts(data.products))
   }
  useEffect(() => {
     getAllProducts()
  }, []);

  
  
  return (<div>
    <div className="mx-[50px] h-screen bg-blue-600/60 my-3">
    </div>
    {
      products.length === 0?<div className="mx-auto">loading... </div>
  :

    <div className="mx-auto  grid grid-cols-12 gap-4 gap-y-8 w-[80%] justify-center items-center min-h-[50vh] ">
     {
    products?.map((item)=><DisplayProd key={item.id} product={item}/>)
    }
    </div>}
  </div>

  )
}