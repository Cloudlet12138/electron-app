export const AppRoutes = [
  {
    path: '/',
    name: '登录',
    component: () => import('@views/Login.vue'),
  },
  {
    path: '/index',
    name: '主页',
    component: () => import('@views/Index.vue'),
  }
];