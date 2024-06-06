import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Error404 = lazy(() => import('../pages/Error404'));
const MemberList = lazy(() => import('../pages/Member/MemberList'));
const ChatRoomList = lazy(() => import('../pages/ChatRoom/ChatRoomList'));
const CalenderView = lazy(() => import('../pages/Calender/CalenderView'));
const MinutesView = lazy(() => import('../pages/Minutes/MinutesView'));
const Setting = lazy(() => import('../pages/Setting'));

type Route = {
  path: string;
  element: JSX.Element;
  layout?: 'blank' | 'guest-blank' | 'auth-blank' | 'auth' | 'guest';
};

const routes: Route[] = [
  // auth
  {
    path: '/login',
    element: <Login />,
    layout: 'guest-blank',
  },
  {
    path: '/register',
    element: <Register />,
    layout: 'guest-blank',
  },
  // dashboard
  {
    path: '/',
    element: <Index />,
    layout: 'auth',
  },
  // general
  // member
  {
    path: '/member',
    element: <MemberList />,
    layout: 'auth',
  },
  // chat room
  {
    path: '/chat-room',
    element: <ChatRoomList />,
    layout: 'auth',
  },
  // calender
  {
    path: '/calender',
    element: <CalenderView />,
    layout: 'auth',
  },
  // minutes
  {
    path: '/minutes',
    element: <MinutesView />,
    layout: 'auth',
  },
  // setting
  {
    path: '/setting',
    element: <Setting />,
    layout: 'auth',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
];

export { routes };
