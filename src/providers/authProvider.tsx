"use client";

import { UserResponseType } from "@/api/users/models/users";
import { createContext, ReactNode, useContext } from "react";

interface AuthProviderType {
  users: UserResponseType;
}

const AuthContext = createContext<AuthProviderType>({} as AuthProviderType);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ users, children }: { users: UserResponseType; children: ReactNode }) => {
  return <AuthContext.Provider value={{ users }}>{children}</AuthContext.Provider>;
};
