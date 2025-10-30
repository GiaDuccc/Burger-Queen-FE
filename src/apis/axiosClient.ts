import axios from "axios";
import { API_ROOT } from "~/utils/constants";

const axiosClient = axios.create({
  baseURL: `${API_ROOT}/v1/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosClient;