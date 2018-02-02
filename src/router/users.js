const UsersList = () => import('@/components/users/List');
const UserView = () => import('@/components/users/UserView');

export default [
  { path: '/users', component: UsersList, meta: { requiresAuth: true } },
  {
    path: '/users/:id',
    component: UserView,
    meta: { requiresAuth: true },
    props: true,
  },
];
