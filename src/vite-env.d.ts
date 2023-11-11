/// <reference types="vite/client" />

// ts只支持导出导入模块，但是vue不是模块，需要申明一下vue是个模块，ts才可以导入
declare module '*.vue' {
  const component: ComponentOptions | ComponentOptions['setup'];
  export default component;
}
