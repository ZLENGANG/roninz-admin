import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    //设置别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [vue()],
  server: {
    // port: 1998, //启动端口
    // hmr: {
    //   host: '127.0.0.1',
    //   port: 1998,
    // },
    // 设置 https 代理
    // proxy: {
    //     '/api': {
    //         target: 'your https address',
    //         changeOrigin: true,
    //         rewrite: (path: string) => path.replace(/^\/api/, '')
    //     }
    // }
  },
  build: {
    rollupOptions: {
      output: {
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
});
