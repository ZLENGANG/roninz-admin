import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { resolveResError } from './helper';
import { createDiscreteApi } from 'naive-ui';

const { message: $message } = createDiscreteApi(['message']);

interface RequestConfig extends InternalAxiosRequestConfig {
  noNeedTip?: boolean;
}

export function reqResolve(config: RequestConfig) {
  return config;
}

export const resResolve = (response: AxiosResponse) => {
  const { data, status, statusText } = response;
  if (data?.code !== 0) {
    const code = data?.code ?? status;

    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, data?.message ?? statusText);

    return Promise.reject({ code, message, error: data || response });
  }
  return Promise.resolve(data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resReject = (error: any) => {
  if (!error || !error.response) {
    const code = error?.code;
    /** 根据code处理对应的操作，并返回处理后的message */
    const message = resolveResError(code, error.message);
    // window.$message?.error(message);
    return Promise.reject({ code, message, error });
  }
  const { data, status, config } = error.response;

  const code = data?.code ?? status;
  const message = resolveResError(code, data?.message ?? error.message);
  /** 需要错误提醒 */
  !config?.noNeedTip && $message.error(message);
  return Promise.reject({ code, message, error: error.response?.data || error.response });
};
