import apiClient from "../../../api/authApi";
import Cookies from "js-cookie";

export const refreshToken = async()=>{
  const token = Cookies.get('refreshToken')
  try {
  const response = await apiClient.post("/api/token/refresh/",
    {refreshToken:token}, {withCredentials:true});
    
  }catch (error: any) {
    return error.messages;
  }

}