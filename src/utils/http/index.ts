import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { reqResolve, resReject, resResolve } from './interceptors';

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

export const http = createAxios();
