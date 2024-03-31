import axiosClient from './../Axios/axios';
export const ProductsApi = {
  getAllProducts : async () => {
    return await axiosClient.get('/product');
  },
  getOneProduct : async (id) => {
    return await axiosClient.get('/product/'+1);
  },
  updateProduct : async (id,data) => {
    return await axiosClient.post('product/'+id,data,{
      headers:{}
     });
  },
  removeProduct:async(id)=>{
    return  await axiosClient.delete('/product/'+id)
   
  }
}