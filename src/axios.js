import axios from "axios";

// export const API_URL = "http://localhost:5000/api";
export const API_URL = "http://localhost:3001";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token")
    ? `Bearer ${localStorage.getItem("token")}`
    : undefined;
  return config;
});

export default $api;
