export interface BackEndResp {
  code: number;
  message: string;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    loading?: boolean;
    noNeedTip?: boolean;
  }
}
