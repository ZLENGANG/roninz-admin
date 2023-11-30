<template>
  <div ref="wrapperRef" class="wrapper" @mousewheel.passive="handleMouseWheel">
    <template v-if="isShowArrow">
      <div class="left dark:bg-dark!">
        <icon-ic:baseline-keyboard-arrow-left />
      </div>
      <div class="right dark:bg-dark!">
        <icon-ic:baseline-keyboard-arrow-right />
      </div>
    </template>

    <div
      ref="contentRef"
      class="content"
      :class="{ overflow: isShowArrow }"
      :style="{
        transform: `translateX(${translateX}px)`,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface MouseWheelEvent extends WheelEvent {
  wheelDelta?: number;
}

const wrapperRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();
const isShowArrow = ref(false);
const translateX = ref(0);

const handleMouseWheel = (e: MouseWheelEvent) => {
  const { wrapperWidth, contentWidth } = getWidth();
  const { wheelDelta = 0 } = e;
  console.log(wrapperWidth, contentWidth, wheelDelta, translateX.value);

  if (wheelDelta < 0) {
    if (contentWidth + translateX.value <= wrapperWidth) {
      return;
    }
  }

  if (wheelDelta > 0 && translateX.value >= 0) {
    return;
  }

  translateX.value += wheelDelta;
};

const handleArrowVisable = () => {
  const { wrapperWidth, contentWidth } = getWidth();
  isShowArrow.value = contentWidth > wrapperWidth;
};

const getWidth = () => {
  return {
    wrapperWidth: wrapperRef.value?.offsetWidth || 0,
    contentWidth: contentRef.value?.offsetWidth || 0,
  };
};

onMounted(() => {
  handleArrowVisable();
});
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

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
