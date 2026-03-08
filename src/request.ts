import useAuthStore from "@/shared/store/useAuthStore.ts";
const API_ROOT = import.meta.env.VITE_BASE_URL || "";
const USE_PROXY = import.meta.env.VITE_USE_PROXY !== "false";
import axios, { AxiosError } from "axios";

// Agar proxy ishlatmayotgan bo'lsak (localhost), baseURL'ga to'g'ridan-to'g'ri murojat qilamiz
// Aks holda proxy orqali '/api' yo'lini ishlatamiz
const baseURL = USE_PROXY ? "/api" : API_ROOT;

const request = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: baseURL,
  params: {},
});

request.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
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
