import { API_URL, KEY_JWT_SESSION } from "@/common/constants";
import axios from "axios";

const ApiService = axios.create({
  baseURL: API_URL || "",
});

ApiService.defaults.headers.common["Authorization"] =
  localStorage.getItem(KEY_JWT_SESSION) || "";

ApiService.defaults.timeout = 2500;

ApiService.interceptors.response.use(
  (response) => {
    console.log("code:err", response)
    return response;
  },
  (response) => {
    console.log("code:err", response)
    return response;
  }
);
export default ApiService;