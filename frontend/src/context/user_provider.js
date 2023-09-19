import { createContext } from "react";
import { useProviderAuth } from "../hooks/auth_hook";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};
