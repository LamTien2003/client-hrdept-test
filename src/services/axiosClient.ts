import axios from "axios";
import { getToken } from "@/utils/storage";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  // baseURL: "https://server-hrdept-test.onrender.com/",
  baseURL: "http://localhost:3000/",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    toast.error(error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // return response.data;
    return response?.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
