import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { AuthConsumer, AuthProvider } from './auth/context';
import { ErrorHandleProvider } from './providers/ErrorHandleProvider';
import { ErrorBoundary } from 'react-error-boundary';
import Error500 from './pages/Error500';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <Suspense>
      <Provider store={store}>
        <AuthProvider>
          <ErrorHandleProvider>
            <ErrorBoundary FallbackComponent={Error500}>
              <AuthConsumer>
                <RouterProvider router={router} />
              </AuthConsumer>
            </ErrorBoundary>
          </ErrorHandleProvider>
        </AuthProvider>
      </Provider>
    </Suspense>
  </HelmetProvider>
);
