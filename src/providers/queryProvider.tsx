'use client';

import { getQueryClient } from '@/lib/queryLib';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
