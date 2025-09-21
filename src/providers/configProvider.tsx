'use client';

import { UserResponse } from '@/api/iam/models/iam';
import { createContext, ReactNode, useContext } from 'react';

interface ConfigProviderType {
  user: UserResponse;
}

const ConfigContext = createContext<ConfigProviderType>(
  {} as ConfigProviderType,
);

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({
  user,
  children,
}: {
  user: UserResponse;
  children: ReactNode;
}) => {
  return (
    <ConfigContext.Provider value={{ user }}>{children}</ConfigContext.Provider>
  );
};
