
import { useRef, useState } from "react"
import  axiosClient  from "../../Axios/axios"
import { useParams } from "react-router-dom";

export default function AddCategory() {
  const nameRef = useRef()
  const [Loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [err, setErr] = useState([]);
  
  
  const addCteg = async (data)=>{
    try {
      setLoading(true)
      await axiosClient.post('/category',data).then((response)=>{
         if(response.data.status ===1){
          setIsAdded(true)
          setErr('')
          displayMsg()
          nameRef.current.value =""
         }
      }).catch(({response})=>{
        console.log(response)
        setErr(response.data.message)
      })
    } catch (error) {
      ()=>{
        console.log(error)
      }
    }finally{
      setLoading(false)
    }
     
  }


  const displayMsg = ()=>{
    return setTimeout(() => {
      setIsAdded(false)
    }, 2000);
    
  }
  const handelSubmit =(e)=>{
   e.preventDefault();
   const name = nameRef.current.value;
   const data = {
    'name':name
   }
   addCteg(data)
  }

  return (
    <div className="w-[60%] bg-slate-400/50 rounded-sm my-5 p-4">
      <div className={`text-green-400 font-bold mx-auto fixed top-[200px]
       ${isAdded?'opacity-1 right-4':'opacity-0 -right-full'} transition-all duration-400  text-center w-[400px] px-3 py-3 bg-slate-50/90 rounded-md`}>
      Category added succesfully
      </div>
      <form  onSubmit={(e)=>handelSubmit(e)} className="flex flex-col  gap-4 w-3/4 mx-auto addProdt">
        {err && <div className="text-red-500">{err}</div>}
      <label htmlFor="name">Category name</label>
      <input type="text"  id="name" ref={nameRef} />
      <button type="submit " className="p-3 bg-blue-400 hover:bg-blue-300 rounded-md w-1/2 mx-auto my-5 ">
        {Loading?'submiting...':'Submit'}
      </button>
      </form>
    </div>
  )
}
