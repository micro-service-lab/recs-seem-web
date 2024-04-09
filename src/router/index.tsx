import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import GuestGuard from '@/auth/guard/redirect-guest-guard';
import AuthGuard from '@/auth/guard/redirect-auth-guard';

const finalRoutes = routes.map((route) => {
  let element;
  switch (route.layout) {
    case 'blank':
      element = <BlankLayout>{route.element}</BlankLayout>;
      break;
    case 'guest-blank':
      element = (
        <GuestGuard>
          <BlankLayout>{route.element}</BlankLayout>
        </GuestGuard>
      );
      break;
    case 'auth-blank':
      element = (
        <AuthGuard>
          <BlankLayout>{route.element}</BlankLayout>
        </AuthGuard>
      );
      break;
    case 'guest':
      element = (
        <GuestGuard>
          <DefaultLayout>{route.element}</DefaultLayout>
        </GuestGuard>
      );
      break;
    case 'auth':
    default:
      element = (
        <AuthGuard>
          <DefaultLayout>{route.element}</DefaultLayout>
        </AuthGuard>
      );
  }
  return {
    ...route,
    element,
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
