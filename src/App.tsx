import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import { IRootState } from './store';
import { toggleTheme, toggleLocale } from './store/themeConfigSlice';
import store from './store';

function App({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
  }, [dispatch, themeConfig.theme, themeConfig.locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="auto">
        <div
          className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} vertical full rtl main-section antialiased relative font-nunito text-sm font-normal`}
        >
          {children}
        </div>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
