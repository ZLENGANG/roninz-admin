// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RespCode = 400 | 401 | 403 | 404 | 500 | -1 | any;

export function resolveResError(code: RespCode, message: string) {
  switch (code) {
    case 400:
      message = message ?? '请求参数错误';
      break;
    case 401:
      message = message ?? '登录已过期';
      break;
    case 403:
      message = message ?? '没有权限';
      break;
    case 404:
      message = message ?? '资源或接口不存在';
      break;
    case 500:
      message = message ?? '服务器异常';
      break;
    default:
      message = message ?? `【${code}】: 未知异常!`;
      break;
  }
  return message;
}
