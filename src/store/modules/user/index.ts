/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        id: '666666666',
      },
    };
  },

  getters: {
    userId(state) {
      return state.userInfo.id;
    },
  },

  actions: {
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
  },
});
