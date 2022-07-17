import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import { CustomTheme, theme } from '../styles/theme';
import { useStore } from '../store/store';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import createEmotionCache from '../lib/cache/createEmoticonCache';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { Box, CssBaseline } from '@mui/material';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { iconInit } from '../data/icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AuthProvider } from '../components/Provider/AuthProvider';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { NextPageWithLayout } from '../types/components.type';
import { MainLayout } from '../Layout/MainLayout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ScrollTop } from '../components/Scroll/ScrollTop';

config.autoAddCss = false;

declare module '@mui/material/styles' {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}

declare module '@mui/material/styles/createTheme' {
  export default function createTheme(
    options?: ThemeOptions,
    ...args: object[]
  ): CustomTheme;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: any;
};

const clientSideEmotionCache = createEmotionCache();

iconInit();

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const [queryClient] = useState(() => new QueryClient());

  const store = useStore(pageProps.initialReduxState);

  const Layout = Component.layout || MainLayout;

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CacheProvider value={emotionCache}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />

                  <Head>
                    <link rel="icon" href="/favicon.ico" />
                  </Head>

                  <Box id="top-anchor" />

                  <ScrollTop />

                  <AuthProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AuthProvider>
                </ThemeProvider>
              </CacheProvider>
            </LocalizationProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
