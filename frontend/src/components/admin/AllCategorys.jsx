
import { useEffect } from "react"
import { MdDeleteForever, MdEditDocument } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { categoriesSelectore } from "../../redux/selectors"
import { CategoriesApi } from "../../Api/categories"
import { removeCategory, setCategories } from "../../redux/sclices/categorySlice"

export default function AllCategorys() {
  const dispatch =useDispatch()
   const categries = useSelector(categoriesSelectore) 
  useEffect(()=>{
    async function getCategs (){
      const {data : categories}= await CategoriesApi.getAllCategories();
      dispatch(setCategories(categories.categorys))
    }
    getCategs()

  },[])
  return (
    <div className="my-8 text-center ">
    <div className="text-xl  font-bold ">AllProducts</div>
    <table className="w-[100%] mx-auto t my-5 ">
      <tr className="border-b ">
      <th className="px-6 ">Name</th>
      <th className="px-6 ">ACATIONS</th>
      </tr>
     {
      categries?.map((categ)=>{
        return<tr key={categ.id} className="p-3 border-b  border-white">
      <td className="px-9  ">{categ.name}</td>
      <td className="my-4 flex justify-center items-center gap-3">
        <button onClick={()=>{
          CategoriesApi.removeCategory(categ.id)
          dispatch(removeCategory(categ.id))
        }} className="p-2 bg-red-400 rounded-md">
           <MdDeleteForever style={{fontSize:"20px"}} />
        </button>
        <Link to={`/dashboard/category/${categ.id}/update`} className=" w-max p-2 bg-blue-400 rounded-md mx-4">
           <MdEditDocument style={{fontSize:"20px"}}/>
        </Link>
        </td>
      </tr>
      })
     }
    </table>
  </div>
  )
}
