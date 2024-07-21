import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['vite:import-analysis']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 9080,
    proxy: {
      '/api': {
        // 选项写法
        target: 'http://www.yztpsg.cn/integration',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/api/, '');
          // 进行调试输出
          console.log('vite proxy url: ', path);
          return path;
        }
      },
      '/dist1': {
        // 选项写法
        target: 'http://localhost:9083',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/dist1/, '');
          // 进行调试输出
          console.log('vite proxy url: ', path);
          return path;
        }
      },
      '/dist2': {
        // 选项写法
        target: 'http://localhost:8082',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/dist2/, '');
          // 进行调试输出
          console.log('vite proxy url: ', path);
          return path;
        }
      },
      '/dist3': {
        // 选项写法
        target: 'http://localhost:8083',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/dist3/, '');
          // 进行调试输出
          console.log('vite proxy url: ', path);
          return path;
        }
      },
      '/dist4': {
        // 选项写法
        target: 'http://localhost:8084',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/dist4/, '');
          // 进行调试输出
          console.log('vite proxy url: ', path);
          return path;
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});
