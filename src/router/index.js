import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import games from './games';
import auth from './auth';
import users from './users';

const DashboardView = () => import('@/components/dashboard/DashboardView');
const NotLogged = () => import('@/components/auth/NotLogged');
const About = () => import('@/components/auth/About');
const Token = () => import('@/components/auth/Token');
const ClubsView = () => import('@/components/clubs/View');

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    { path: '/notLogged', component: NotLogged },
    { path: '/about', component: About },
    { path: '/token', component: Token },
    { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/clubs', component: ClubsView, meta: { requiresAuth: true } },
    ...games,
    ...auth,
    ...users,
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // TODO implement isAdmin/isUser checking from isPositive meta field value
    if (!store.getters.isLogged) {
      next({
        path: '/notLogged',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
