import { defineConfig } from 'vite';
import * as path from 'path';
import { createVitePlugins } from './build/plugins/index';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    base: './',
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [createVitePlugins()],
    server: {
      proxy: {
        '/api/': {
          target: 'http://localhost:9999',
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          // 分包
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              const arr = id.toString().split('node_modules/')[1].split('/');
              switch (arr[0]) {
                case '@vue':
                case 'lodash-es':
                case 'naive-ui':
                  return arr[0];
                default:
                  return 'vendor';
              }
            }
          },
        },
      },
    },
  };
});
