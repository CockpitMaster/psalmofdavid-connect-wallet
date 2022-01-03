import React from "react";

import { useEagerConnect } from "@/lib/connect-wallet/hooks/useEagerConnect";
import { useInactiveListener } from "@/lib/connect-wallet/hooks/useInactiveListener";
import { networkId } from "@/src/config/environment";
import { useNotifier } from "@/src/hooks/useNotifier";

const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const { notifier } = useNotifier();

  useEagerConnect(networkId, notifier);
  useInactiveListener(networkId, notifier);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
