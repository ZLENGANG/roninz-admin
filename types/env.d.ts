/**
 *后台服务的环境类型
 * - dev: 后台开发环境
 * - test: 后台测试环境
 * - prod: 后台生产环境
 */

export type ServiceEnvType = 'dev' | 'test' | 'prod';

/** 后台服务的环境配置 */
export interface ServiceEnvConfig {
  /** 请求地址 */
  url: string;
}

export interface ServiceEnvConfigWithProxyPattern extends ServiceEnvConfig {
  /**
   * 匹配路径的正则字符串
   * - 用于拦截地址转发代理(任意以 /开头 + 字符串, 单个/不起作用)
   * - 和后端请求地址的前缀无关
   * - 有多个后端请求实例时，需要创建不同的值
   */
  proxyPattern: '/proxy-pattern';
}

export interface ImportMetaEnv {
  /** 后端服务的环境类型 */
  readonly VITE_SERVICE_ENV?: ServiceEnvType;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
