const Login = () => import('@/components/auth/Login');
const Logout = () => import('@/components/auth/Logout');

export default [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/logout',
    component: Logout,
    meta: { requiresAuth: true },
  },

];
