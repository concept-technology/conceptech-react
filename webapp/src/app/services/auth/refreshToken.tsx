import Cookies from "js-cookie";
import apiClient from "../../../api/authApi";


export const refreshToken = async()=>{
  try {
  const response = await apiClient.post("/api/token/refresh/",
    {}, {withCredentials:true});

    console.log("new_refreshToken", response.data.message);
  }catch (error: any) {
    return error.messages;
  }

}