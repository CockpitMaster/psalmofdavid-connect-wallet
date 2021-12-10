import { rpcUrls } from "@/lib/connect-wallet/config/rpcUrls";
import { getOne } from "./random";

// Used if wallet is not connected
export const getNodeUrl = (networkId) => {
  const nodes = rpcUrls[networkId];
  return getOne(...nodes);
};
