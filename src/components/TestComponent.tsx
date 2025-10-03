'use client';

import { getQueryClient } from '@/lib/queryLib';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const TestComponent = ({
  withQueryClient,
  children,
}: {
  withQueryClient?: boolean;
  children: ReactNode;
}) => {
  if (!withQueryClient) return children;

  const queryClient = getQueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
