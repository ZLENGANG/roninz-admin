import { resetToken } from '@/service';
import { lStorage } from '..';

const TOKEN_CODE = 'token';

// 6小时过期
const DURATION = 60 * 60 * 6;

export const setToken = (token: string): void => {
  lStorage.set(TOKEN_CODE, token, DURATION);
};

export const getToken = (): string => {
  return lStorage.get(TOKEN_CODE);
};

export const removeToken = (): void => {
  lStorage.remove(TOKEN_CODE);
};

// 0.5小时到6小时操作会刷新token
export const refreshToken = async () => {
  const tokenItem = lStorage.getItem(TOKEN_CODE);
  if (!tokenItem) return;

  const { time } = tokenItem;

  if (Date.now() - time <= 1000 * 60 * 30) return;

  try {
    const res = await resetToken();
    setToken(res.data.token);
  } catch (error) {
    console.log(error);
  }
};
