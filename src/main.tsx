import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { AuthConsumer, AuthProvider } from "./auth/context";
import { ErrorHandleProvider } from "./providers/ErrorHandleProvider";
import { ErrorBoundary } from "react-error-boundary";
import Error500 from "./pages/Error500";

// Tailwind css
import "./tailwind.css";

// i18n (needs to be bundled)
import "./i18n";

// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// Redux
import { Provider } from "react-redux";
import store from "./store/index";

// Router
import { RouterProvider } from "react-router-dom";
import router from "./router/index";
import { RecoilRoot } from "recoil";
import { WsProvider } from "./providers/WsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <HelmetProvider>
    <RecoilRoot>
      <Suspense>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ErrorHandleProvider>
                <ErrorBoundary FallbackComponent={Error500}>
                  <AuthConsumer>
                    <WsProvider>
                      <RouterProvider router={router} />
                    </WsProvider>
                  </AuthConsumer>
                </ErrorBoundary>
              </ErrorHandleProvider>
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      </Suspense>
    </RecoilRoot>
  </HelmetProvider>
);
