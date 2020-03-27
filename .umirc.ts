import { defineConfig, createBrowserHistory } from 'umi';
import { routes } from './src/config/routes';

export default defineConfig({
  dva: {
    immer: true,
  },
  history: { type: 'hash' },
  // ssr:{},
  antd: {},
  theme: {
    '@primary-color': '#000000',
    '@fill-body': '#000000',
  },
  hash: true,
  dynamicImport: {
    loading: '@/pages/components/loading',
  },
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
    antd: true,
  },
  proxy: {
    '/user': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/blog': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  routes,
});
