import axios from "axios";

import { config } from "@/app/config/config";

export const axiosInterceptorInstance = axios.create({
  baseURL: config.backend.apiUrl,
});

axiosInterceptorInstance.interceptors.request.use(
  (reqConfig) => {
    // eslint-disable-next-line no-param-reassign
    reqConfig.headers.token = localStorage.getItem("token");

    return reqConfig;
  },
  (error) => {
    return error;
  },
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  },
);
