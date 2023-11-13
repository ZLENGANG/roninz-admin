import { http } from '@/utils/http';
import { LoginParams } from './type';
const AUTH_PATH = '/api/auth';

export const login = (params: LoginParams) => {
  return http.post(`${AUTH_PATH}/login`, params, { noNeedTip: false });
};
