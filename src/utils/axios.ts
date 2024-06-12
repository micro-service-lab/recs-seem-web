import axios, { AxiosRequestConfig } from "axios";
// config
import { HOST_API } from "@/config-global";
import { convertKeysToCamelCase, convertKeysToSnakeCase } from "./change-case";

// ----------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "axios" {
  export interface AxiosResponse<T = any> {
    errorMessage?: string;
    errorMessageParam?: {
      [key in string]: string;
    };
  }
}

type Headers = {
  "X-Requested-With": string;
  "CSRF-Token"?: string;
  "XSRF-TOKEN"?: string;
};

// default values
const headers: Headers = {
  "X-Requested-With": "XMLHttpRequest",
};

const axiosInstance = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
  headers,
});

export default axiosInstance;

axiosInstance.interceptors.request.use((request) => {
  if (request.data instanceof FormData) {
    return request;
  }
  request.data = convertKeysToSnakeCase(request.data);
  if (request.params) {
    request.params = convertKeysToSnakeCase(request.params);
  }
  return request;
});

axiosInstance.interceptors.response.use((response) => {
  response.data = convertKeysToCamelCase(response.data);
  return response;
});

export const rawAxiosInstance = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
  headers,
});

rawAxiosInstance.interceptors.request.use((request) => {
  request.data = convertKeysToSnakeCase(request.data);
  return request;
});

rawAxiosInstance.interceptors.response.use((response) => {
  response.data = convertKeysToCamelCase(response.data);
  return response;
});

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};
