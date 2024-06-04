import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/Login'));
const Error404 = lazy(() => import('../pages/Error404'));
const MemberList = lazy(() => import('../pages/member/MemberList'));

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
    layout: 'guest',
  },
  // general
  // member
  {
    path: '/member',
    element: <MemberList />,
    layout: 'guest',
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
