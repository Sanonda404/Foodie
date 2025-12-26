import axios from "axios";
import type { AxiosInstance } from "axios";

// Create an Axios instance with a base URL
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});


export default api;