import { post } from '@/service/request';
import { LoginParams } from './type';
const AUTH_PATH = '/api/auth';

export const login = (params: LoginParams) => {
  return post(`${AUTH_PATH}/login`, params, { loading: true });
};

export const resetToken = () => {
  return post(`${AUTH_PATH}/refreshToken`);
};
