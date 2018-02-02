const List = () => import('@/components/games/List');
const Dashboard = () => import('@/components/games/Dashboard/Dashboard');
const Create = () => import('@/components/games/Create');

export default [
  {
    path: '/games',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/games/join',
    component: List,
    meta: { requiresAuth: true },
  },
  {
    path: '/create',
    component: Create,
    meta: { requiresAuth: true, isPositive: 'isAdmin' },
  },
  {
    path: '/games/:gameId',
    component: Dashboard,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/games/:gameId/join',
    component: Dashboard,
    meta: { requiresAuth: true },
    props: true,
  },
];
