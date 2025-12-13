import useAuthStore from "@/shared/store/useAuthStore.ts";
const API_ROOT = import.meta.env.VITE_BASE_URL || "";
import axios, { AxiosError } from 'axios';

const request = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: API_ROOT,
  params: {}
});

request.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);


request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export { request };
