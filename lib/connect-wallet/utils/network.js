import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";

export const getNetwork = (networkId = CHAIN_ID) => {
  return networks.find((x) => x.id === networkId);
};
