import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/Login'));
const Error404 = lazy(() => import('../pages/Error404'));

type Route = {
  path: string;
  element: JSX.Element;
  layout?: 'blank' | 'guest-blank' | 'auth-blank' | 'auth' | 'guest';
};

const routes: Route[] = [
  // dashboard
  {
    path: '/',
    element: <Index />,
    layout: 'auth',
  },
  {
    path: '/login',
    element: <Login />,
    layout: 'guest-blank',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
];

export { routes };
