import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";
import rpcUrls from "../../config/rpcUrls";
import { getOne } from "../random";

// Used if no metamask or any wallet is connected
export const getNodeUrl = () => {
  const nodes = rpcUrls[CHAIN_ID];

  return getOne(...nodes);
};
