import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BANCKEND_URL,
    withCredentials:true,
    withXSRFToken:true,
    headers:{'Content-Type': ['multipart/form-data',
      'application/json'],
      'Accept':'application/json', 
    "Authorization":`Bearer ${localStorage.getItem('access_token')}`},
  }
)
axiosClient.interceptors.request.use((config)=>{
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = 'Bearer '+token
  return config
})

axiosClient.interceptors.response.use((response)=>{
  return response
},(err)=>{
  const {response}= err;
  if(response?.status === 401){
    localStorage.removeItem('access_token')
  }
  throw err
})
export default axiosClient;
