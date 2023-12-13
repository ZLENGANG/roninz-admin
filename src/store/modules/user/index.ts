import { defineStore } from 'pinia';
import { getUser } from '@/service';

interface UserState {
  userInfo: {
    id: string;
    name: string;
    avatar: string;
    roles: string[];
  };
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: {
        id: '',
        name: '',
        avatar: '',
        roles: [],
      },
    };
  },

  getters: {
    userId(): string {
      return this.userInfo.id;
    },
    roles(): string[] {
      return this.userInfo.roles;
    },
  },

  actions: {
    async getUserInfo() {
      try {
        const res = await getUser();
        const { id, name, avatar, role } = res.data;
        this.userInfo = { id, name, avatar, roles: role };
        return Promise.resolve(res.data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    resetUser() {
      this.$reset();
    },
  },
});
