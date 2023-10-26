import axios, { AxiosRequestConfig } from "axios";

export const UseAxios = (url?: string, options?: AxiosRequestConfig) => {
  const defaultOptions = {
    baseURL: url || "http://localhost:3000/api",

    headers: {
      "Content-Type": "application/json",
    },
  };
  const api = axios.create(options || defaultOptions);
  return { api };
};
