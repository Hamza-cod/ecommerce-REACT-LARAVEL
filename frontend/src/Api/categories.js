import axiosClient from './../Axios/axios';
export const CategoriesApi = {
  getAllCategories : async () => {
    return await axiosClient.get('/category');
  },
  getOneCategory : async (id) => {
    return await axiosClient.get('/category/'+id);
  },
  updateCategory : async (id,data) => {
    return await axiosClient.post('/category/'+id,data);
  },
  removeCategory:async(id)=>{
    return  await axiosClient.delete('/category/'+id)
   
  }
}