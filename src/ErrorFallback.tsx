import Layout from '@/components/Layouts/BlankLayout';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';
import Page500 from '@/pages/Error500';

function ErrorFallback() {
  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
        <Page500/>
      </Suspense>
    </Layout>
  );
}
export default ErrorFallback;