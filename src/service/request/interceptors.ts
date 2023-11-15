import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { resolveResError } from './helper';
import { createDiscreteApi } from 'naive-ui';
import { BackEndResp } from '#/axios';
import { hideFullScreenLoading, showFullScreenLoading } from './loading';

const { message: $message } = createDiscreteApi(['message']);

export function reqResolve(config: InternalAxiosRequestConfig) {
  config.loading && showFullScreenLoading();
  return config;
}

export function reqReject(error: AxiosError) {
  hideFullScreenLoading();
  Promise.reject(error);
}

export const resResolve = (response: AxiosResponse) => {
  const { data, status, statusText } = response;
  hideFullScreenLoading();
  if (data?.code !== 0) {
    const code = data?.code ?? status;

    // 根据code处理对应的操作，并返回处理后的message
    const message = resolveResError(code, data?.message ?? statusText);

    return Promise.reject({ code, message, error: data || response });
  }

  return Promise.resolve(data);
};

export const resReject = (error: AxiosError<BackEndResp>) => {
  hideFullScreenLoading();
  if (!error || !error.response) {
    const code = error?.code;

    // 根据code处理对应的操作，并返回处理后的message
    const message = resolveResError(code, error.message);

    $message.error(message);

    return Promise.reject({ code, message, error });
  }
  const { data, status, config } = error.response;

  const code = data?.code ?? status;
  const message = resolveResError(code, data?.message ?? error.message);

  // 需要错误提醒
  !config?.noNeedTip && $message.error(message);

  return Promise.reject({ code, message, error: error.response?.data || error.response });
};
