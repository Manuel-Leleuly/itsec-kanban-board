'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { ReactNode } from 'react';

export const ProgressAppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider height='4px' options={{ showSpinner: false }}>
      {children}
    </ProgressProvider>
  );
};
