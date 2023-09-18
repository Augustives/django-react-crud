import { createContext } from "react";
import { useProviderAuth } from "../hooks/auth_hook";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
