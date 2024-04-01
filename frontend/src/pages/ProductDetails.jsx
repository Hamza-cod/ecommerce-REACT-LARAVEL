
import { Link, useParams } from "react-router-dom";
import DisplayProd from "../components/DisplayProd";
import { useSelector } from "react-redux";
import { productsSelectore } from "../redux/selectors";

const ProductDetails = () => {
  const { id } = useParams();
  const allProducts = useSelector(productsSelectore)
const selectedProduct = allProducts?.find((item) => item.id == id)
 if(selectedProduct){
   var { image, price, description, name: title } =  selectedProduct;
 }
  const ProducSameCAtegory = allProducts?.filter(
    (item) => item.id != id && item.category?.name == selectedProduct.category?.name
  );
  

  return (
    <section
      className="container min-h-screen  px-9 mx-auto grid   grid-cols-6 gap-4 items-center justify-center "
      id="up"
    >
      <div className=" col-span-6 md:col-span-3  mx-auto flex items-center justify-center">
        <img
          src={import.meta.env.VITE_BANCKEND_URL + "/storage/" + image}
          className="w-[300PX] "
          alt="alt"
        />
      </div>
      <div className="col-span-6 md:col-span-3 mx-6 md:mx-9 flex flex-col gap-5 text-center md:text-start">
        <h1 className="font-bold ">{title}</h1>
        <h2 className="font-semibold">{selectedProduct?.category?.name}</h2>
        <p>{description}</p>
        <span className="font-bold">PRICE : {price} $ </span>
        <Link to={'/order/'+id} 
        className="p-4 px-5 rounded-lg text-center bg-blue-700 hover:bg-blue-800 max-w-[200px] text-white mx-auto md:mx-0">
          Order Now
        </Link>
      </div>
      <div className="col-span-6   flex flex-col gap-5 my-6">
        {ProducSameCAtegory.length >0 && <><div className="capitalize mx-10"> pruducts in the same category</div>

        <div className="mx-auto grid grid-cols-12 gap-4 gap-y-8 w-[80%] ">
          {ProducSameCAtegory.map((product) => {
            return <DisplayProd product={product} key={product.id} />;
          })}
        </div></>}
      </div>
    </section>
  );
};

export default ProductDetails;
