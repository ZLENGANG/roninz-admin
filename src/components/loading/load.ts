import { createApp, reactive } from 'vue';
import Loading from './index.vue';

const divDom = document.createElement('div');
divDom.setAttribute('class', 'loading-container');

const options = reactive({
  show: true,
  title: '拼命加载中...',
});

//这里是关键部位options 是向Loading 组件传递的参数
const $loading = createApp(Loading, { options }).mount(divDom);

interface LoadingProps {
  show?: boolean;
  title: string;
}

interface LoadPlguin {
  show(options: LoadingProps): void;
  hide(): void;
}

export const loadPlguin: LoadPlguin = {
  show({ title }) {
    // 控制显示loading的方法,这里是show方法传入的对象
    options.show = true;
    options.title = title;
    document.body.appendChild($loading.$el);
  },

  hide() {
    // 控制loading隐藏的方法
    options.show = false;
  },
};
