import axiosClient from "../Axios/axios"

export const AdminApi = {
  logout : async ()=>{
    await axiosClient.post('/logout')
  }
}