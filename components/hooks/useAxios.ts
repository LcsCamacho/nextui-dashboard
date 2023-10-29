import axios, { AxiosRequestConfig } from "axios";
import { currentUrl } from "../../constants/urlFetch";

export const UseAxios = (url?: string, options?: AxiosRequestConfig) => {
  const defaultOptions = {
    baseURL: url || currentUrl,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const api = axios.create(options || defaultOptions);
  return { api };
};
