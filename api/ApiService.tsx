import { API_URL, KEY_JWT_SESSION } from "@/common/constants";
import AppStorage from "@/utils/AppStorage";
import axios from "axios";

const ApiService = axios.create({
  baseURL: API_URL || "",
  withCredentials:true
});

ApiService.interceptors.request.use(
  async (config) => {
    const token = await AppStorage.getItem(KEY_JWT_SESSION);
    if (token != null && token != undefined) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.defaults.timeout = 2500;

ApiService.interceptors.response.use(
  (response) => {
    console.log("code:res", response)
    return response;
  },
  (response) => {
    console.log("code:err", response)
    return response;
  }
);
export default ApiService;