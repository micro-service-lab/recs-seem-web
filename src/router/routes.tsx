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
    layout: 'guest',
  },
  // general
  // member
  {
    path: '/member',
    element: <MemberList />,
    layout: 'guest',
  },
  // chat room
  {
    path: '/chat-room',
    element: <ChatRoomList />,
    layout: 'guest',
  },
  // calender
  {
    path: '/calender',
    element: <CalenderView />,
    layout: 'guest',
  },
  // minutes
  {
    path: '/minutes',
    element: <MinutesView />,
    layout: 'guest',
  },
  // setting
  {
    path: '/setting',
    element: <Setting />,
    layout: 'guest',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
];

export { routes };
