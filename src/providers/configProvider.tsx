"use client";

import { UserType } from "@/api/users/models/users";
import { createContext, ReactNode, useContext } from "react";

interface ConfigProviderType {
  user: UserType;
}

const ConfigContext = createContext<ConfigProviderType>({} as ConfigProviderType);

export const useConfigContext = () => useContext(ConfigContext);

export const ConfigContextProvider = ({ user, children }: { user: UserType; children: ReactNode }) => {
  return <ConfigContext.Provider value={{ user }}>{children}</ConfigContext.Provider>;
};
