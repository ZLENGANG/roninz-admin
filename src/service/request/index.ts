import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { reqResolve, resReject, resResolve } from './interceptors';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  noNeedTip?: boolean;
  looding?: boolean;
}

export const createAxios = (options: CreateAxiosDefaults = {}): AxiosInstance => {
  const defaultConfig = {
    timeout: 60 * 1000 * 2,
  };

  const service = axios.create({
    ...defaultConfig,
    ...options,
  });

  service.interceptors.request.use(reqResolve);
  service.interceptors.response.use(resResolve, resReject);

  return service;
};

export const http = createAxios({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const post = <T>(url: string, data?: T, config?: CustomAxiosRequestConfig) => {
  return http.post(url, data, config);
};

export const get = <T>(url: string, data?: T, config?: CustomAxiosRequestConfig) => {
  return http.get(url, { ...data, ...config });
};

export const postForm = <T>(url: string, data?: T, config?: CustomAxiosRequestConfig) => {
  return http.post(url, data, { ...{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, ...config } });
};
