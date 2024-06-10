import { PropsWithChildren, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { IRootState } from "./store";
import { toggleTheme, toggleLocale } from "./store/themeConfigSlice";
import store from "./store";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { LoadingScreen } from "./components/LoadingScreen";

function App({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem("theme") || themeConfig.theme));
    dispatch(
      toggleLocale(localStorage.getItem("i18nextLng") || themeConfig.locale)
    );
  }, [dispatch, themeConfig.theme, themeConfig.locale]);

  return (
    <MantineProvider defaultColorScheme="auto">
      <div
        className={`${
          (store.getState().themeConfig.sidebar && "toggle-sidebar") || ""
        } vertical full rtl main-section antialiased relative font-nunito text-sm font-normal max-h-screen`}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </ErrorBoundary>
      </div>
    </MantineProvider>
  );
}

export default App;
