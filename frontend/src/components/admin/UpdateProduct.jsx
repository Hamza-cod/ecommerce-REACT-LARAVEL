import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "../../Axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelectore, productsSelectore } from "../../redux/selectors";
import { CategoriesApi } from "../../Api/categories";
import { setCategories } from "../../redux/sclices/categorySlice";

export default function UpdateProduct() {
  const { id } = useParams();
  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const CategRef = useRef();
  const ImageRef = useRef();
  const [loading, setLoadin] = useState(false);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const allProducts = useSelector(productsSelectore);
  const categs = useSelector(categoriesSelectore);
  const selectedProduct  = allProducts?.find((item) => item.id == id);
  const dispatch = useDispatch()
  const SendData = async (data) => {
    try {
      setLoadin(true);
      console.log(data);
      const response = await axiosClient
        .post("product/" + id, data, {
          headers: {},
        })
        .catch(({ response }) => {
          setErr(response.data.message);
          console.log(response);
        });
      console.log(response);
      if (response.data.status === "ok") {
        setErr("");
        setMessage("added");
        displayMessage();
        setTimeout(() => {
          navigate("/dashboard/all_products");
        }, 900);
      }
    } catch {
      (err) => {
        console.log(err);
      };
    } finally {
      setLoadin(false);
    }
  };
  

  const displayMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const data = {
      _method: "PUT",
      name: nameRef.current.value,
      description: descRef.current.value,
      price: priceRef.current.value,
      image:
        ImageRef.current.files[0] !== null ? ImageRef.current.files[0] : null,
      category_id: CategRef.current.value,
    };

    SendData(data);
  };
  useEffect(()=>{
     (async ()=>{
     const {data}= await CategoriesApi.getAllCategories();
     dispatch(setCategories(data))
     })
  },[])
  

  return (
    <div className="w-3/4 mx-auto p-3 bg-slate-50/40 shadow-md my-5 addProdt">
      <div>Update Product : </div>
      {err && <div className="text-red-500 text-center w-full">{err}</div>}
      <div
        className={`text-green-400 font-bold mx-auto fixed top-[200px]
       ${
         message ? "opacity-1 right-[35%] " : ` opacity-0 -right-full `
       }  transition-all duration-400 ease-out text-center w-[400px] px-3 py-3 bg-slate-50/90 rounded-md`}
      >
        Product Updatet sucssefully
      </div>
      <form onSubmit={handelSubmit} encType="multipart/form-data">
        <div className=" w-[90%] flex flex-col gap-4 p-5 mx-auto ">
          <div className="w-full p-2 flex flex-col gap-2 ">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              name=""
              id=""
              ref={nameRef}
              defaultValue={selectedProduct?.name}
            />
          </div>
          <div className=" w-full p-2 flex flex-col gap-2 ">
            <label htmlFor="descrip">Product Description</label>
            <textarea
              type="text"
              name=""
              id=""
              ref={descRef}
              defaultValue={selectedProduct?.description}
            />
          </div>
          <div className=" w-full p-2 flex flex-col gap-2 ">
            <label htmlFor="categ">Categorus</label>
            <select id="categ" ref={CategRef}>
              <option selected value={selectedProduct?.category_id}>
                {selectedProduct?.category?.name}
              </option>
              {categs
                .filter((item) => item.id !== selectedProduct?.category_id)
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className=" w-full p-2 flex justify-between gap-4 ">
            <div className="flex flex-col  gap-3  ">
              <label htmlFor="Price">Price (DH)</label>
              <input
                type="text"
                min={1}
                name=""
                id=""
                defaultValue={selectedProduct?.price}
                ref={priceRef}
              />
            </div>
            <div className="flex flex-col  gap-3  ">
              <label htmlFor="image">image</label>
              <img
                src={
                  import.meta.env.VITE_BANCKEND_URL + "/storage/" + selectedProduct?.image
                }
                width={100}
                alt={selectedProduct?.name}
              />
              <input type="file" id="image" ref={ImageRef} accept="image/*" />
            </div>
          </div>
          {err && <div className="text-red-500 text-center w-full">{err}</div>}
          <button
            className="p-3 bg-blue-400 hover:bg-blue-300 transition duration-300 text-xl rounded-md w-[300px]
      my-3 mx-auto"
            type="submit"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
