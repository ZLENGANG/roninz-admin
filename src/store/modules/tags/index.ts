import { sStorage } from '@/utils';
import { router } from '@/router';
import { activeTag, tags } from './helpers';

interface TagsState {
  tags: RouteTag[]; // 标签栏所有标签
  activeTag: string; // 当前选中标签
  reloading: boolean; // 正在刷新页面
}

export const useTagsStore = defineStore('tags', {
  state: (): TagsState => ({
    tags: tags || [],
    activeTag: activeTag || '',
    reloading: false,
  }),

  getters: {
    activeTagIndex(): number {
      return this.tags.findIndex((item) => item.path === this.activeTag);
    },
  },

  actions: {
    // 设置当前选中标签
    setActiveTag(path: string) {
      this.activeTag = path;
      sStorage.set('activeTag', path);
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
      if (path === this.activeTag) {
        router.push(this.tags[this.tags.length - 1].path);
      }
    },

    reloadTag() {
      this.reloading = true;
      nextTick(() => {
        this.reloading = false;
      });
    },
  },
});
