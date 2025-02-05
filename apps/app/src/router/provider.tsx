import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Loading } from '~/components/Loading';
import { useState } from 'react';
import { MainErrorFallback } from '~/components/Errors/MainErrorFallback';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            networkMode: 'always',
          },
          mutations: {
            networkMode: 'always',
          },
        },
      })
  );

  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <SnackbarProvider
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            maxSnack={1}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </SnackbarProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
