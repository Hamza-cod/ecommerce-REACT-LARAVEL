import axiosClient from "../Axios/axios"

export const AdminApi = {
  logout : async ()=>{
    localStorage.removeItem('access_token')
    await axiosClient.post('/logout')
  }
}