import { sStorage } from '@/utils';
import { router } from '@/router';
import { activeTagPath, tags } from './helpers';
import { RouteLocationNormalizedLoaded } from 'vue-router';

interface TagsState {
  tags: RouteTag[]; // 标签栏所有标签
  activeTagPath: string; // 当前选中标签
  reloading: boolean; // 正在刷新页面
}

export const useTagsStore = defineStore('tags', {
  state: (): TagsState => ({
    tags: tags || [],
    activeTagPath: activeTagPath || '',
    reloading: false,
  }),

  getters: {
    activeTagIndex(): number {
      return this.tags.findIndex((item) => item.path === this.activeTagPath);
    },
  },

  actions: {
    // 设置当前选中标签
    setActiveTag(path: string) {
      this.activeTagPath = path;
      sStorage.set('activeTagPath', path);
    },

    // 设置标签栏
    setTags(tags: RouteTag[]) {
      this.tags = tags;
      sStorage.set('tags', tags);
    },

    // 添加标签
    addTag(tag: RouteTag) {
      const findItem = this.tags.find((item) => item.path === tag.path);
      if (!findItem) {
        this.setTags([...this.tags, tag]);
      }
      this.setActiveTag(tag.path);
    },

    // 移除标签
    removeTag({ path }: RouteTag['path']) {
      this.setTags(this.tags.filter((tag) => tag.path !== path));
      if (path === this.activeTagPath) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },

    // 重新加载
    async reloadTag(route: RouteLocationNormalizedLoaded) {
      const {
        path,
        meta: { keepAlive },
      } = route;
      const findItem = this.tags.find((item) => item.path === path);

      // 清除缓存
      if (findItem && keepAlive) {
        findItem.meta.keepAlive = false;
      }
      window.$loadingBar?.start();

      // 刷新页面
      this.reloading = true;
      await nextTick();
      this.reloading = false;

      // 重新设置缓存
      if (findItem) {
        findItem.meta.keepAlive = keepAlive;
      }

      // 重置滚动条位置
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
        window.$loadingBar?.finish();
      }, 100);
    },

    // 关闭其他标签页
    closeOtherTags(path: string) {
      this.setTags(this.tags.filter((tag) => tag.path === path));
      if (path !== this.activeTagPath) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },

    // 关闭左侧标签
    closeLeftTags(path: string) {
      const curIndex = this.tags.findIndex((tag) => tag.path === path);
      this.setTags(this.tags.slice(curIndex));
      if (path !== this.activeTagPath) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },

    // 关闭右侧标签
    closeRightTags(path: string) {
      const curIndex = this.tags.findIndex((tag) => tag.path === path);
      this.setTags(this.tags.slice(0, curIndex + 1));
      if (path !== this.activeTagPath) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },
  },
});
