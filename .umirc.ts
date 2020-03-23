import { defineConfig } from 'umi';

export default defineConfig({
  dva: {
    immer: true,
  },
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
  routes: [
    {
      exact: true,
      path: '/register',
      component: '@/pages/user/register',
      title: '登录/注册',
    },
    // { exact: true, path: '/login', component: '@/pages/user/login', title: '登录' },
    {
      exact: true,
      path: '/userAgreement',
      component: '@/components/userAgreement',
      title: '用户协议',
    },
    {
      exact: true,
      path: '/write',
      component: '@/pages/edit',
      title: '用户协议',
    },
    {
      exact: true,
      path: '/privacyPolicy',
      component: '@/components/privacyPolicy',
      title: '隐私政策',
    },
    {
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/',
          component: '@/pages/home/index',
          title: '前端学习笔记',
        },
        {
          exact: true,
          path: '/article/:id',
          component: '@/pages/article-detail/[id]',
          title: '文章详情',
        },
        {
          exact: true,
          path: '/loading',
          component: '@/pages/components/loading',
        },
      ],
    },
  ],
});
