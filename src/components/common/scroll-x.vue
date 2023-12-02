<template>
  <div ref="wrapper" class="wrapper h-full" @mousewheel.passive="handleMouseWheel">
    <template v-if="showArrow && isOverflow">
      <div class="left dark:bg-dark!" @click="handleMouseWheel({ wheelDelta: 120 } as MouseWheelEvent)">
        <icon-ic:baseline-keyboard-arrow-left />
      </div>
      <div class="right dark:bg-dark!" @click="handleMouseWheel({ wheelDelta: -120 } as MouseWheelEvent)">
        <icon-ic:baseline-keyboard-arrow-right />
      </div>
    </template>

    <div
      ref="content"
      class="content"
      :class="{ overflow: isOverflow && showArrow }"
      :style="{
        transform: `translateX(${translateX}px)`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResize } from '@/utils';
import { debounce } from 'lodash-es';

interface MouseWheelEvent extends WheelEvent {
  wheelDelta?: number;
}

defineProps({
  showArrow: {
    type: Boolean,
    default: true,
  },
});

const translateX = ref(0);
const content = ref<HTMLElement>();
const wrapper = ref<HTMLElement>();
const isOverflow = ref(false);
const observers = ref<ResizeObserver[]>([]);

// 加载完dom后刷新是否溢出
onMounted(() => {
  refreshIsOverflow();

  observers.value.push(useResize(document.body, refreshIsOverflow));
  observers.value.push(useResize(content.value as HTMLElement, refreshIsOverflow));
});

// 获取容器的宽度和内容的宽度
const getWidth = () => {
  return {
    wrapperWidth: wrapper.value?.offsetWidth || 0,
    contentWidth: content.value?.offsetWidth || 0,
  };
};

// 刷新是否溢出
const refreshIsOverflow = debounce(() => {
  const { wrapperWidth, contentWidth } = getWidth();
  isOverflow.value = contentWidth > wrapperWidth;
  resetTranslateX(wrapperWidth, contentWidth);
}, 200);

// 鼠标滚轮移动事件和点击箭头事件
const handleMouseWheel = (e: MouseWheelEvent) => {
  const { wheelDelta = 0 } = e;
  const { wrapperWidth, contentWidth } = getWidth();
  /**
   * @wheelDelta 平行滚动的值 >0： 右移  <0: 左移
   * @translateX 内容translateX的值
   * @wrapperWidth 容器的宽度
   * @contentWidth 内容的宽度
   */
  if (wheelDelta < 0) {
    if (wrapperWidth > contentWidth && translateX.value < -10) return;
    if (wrapperWidth <= contentWidth && contentWidth + translateX.value - wrapperWidth < -10) return;
  }
  if (wheelDelta > 0 && translateX.value > 10) {
    return;
  }

  translateX.value += wheelDelta;
  resetTranslateX(wrapperWidth, contentWidth);
};

// 重置偏移量
const resetTranslateX = debounce(function (wrapperWidth, contentWidth) {
  if (!isOverflow.value) {
    translateX.value = 0;
  } else if (-translateX.value > contentWidth - wrapperWidth) {
    translateX.value = wrapperWidth - contentWidth;
  } else if (translateX.value > 0) {
    translateX.value = 0;
  }
}, 200);

function handleScroll(x: number, width: number) {
  const { wrapperWidth, contentWidth } = getWidth();

  if (contentWidth <= wrapperWidth) return;

  // 当 x 小于可视范围的最小值时
  if (x < -translateX.value + 150) {
    translateX.value = -(x - 150);
    resetTranslateX(wrapperWidth, contentWidth);
  }

  // 当 x 大于可视范围的最大值时
  if (x + width > -translateX.value + wrapperWidth) {
    translateX.value = wrapperWidth - (x + width);
    resetTranslateX(wrapperWidth, contentWidth);
  }
}

defineExpose({
  handleScroll,
});

// 组件销毁前移除监听
onBeforeUnmount(() => {
  observers.value.forEach((item) => {
    item?.disconnect();
  });
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  background-color: #fff;

  z-index: 9;
  overflow: hidden;
  position: relative;
  .content {
    padding: 0 10px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    transition: transform 0.5s;
    &.overflow {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
  .left,
  .right {
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;

    width: 20px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    border: 1px solid #e0e0e6;
    border-radius: 2px;

    z-index: 2;
    cursor: pointer;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
}
</style>
