import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { rpcUrls } from "@/lib/connect-wallet/config/rpcUrls";
import { POLLING_INTERVAL } from "@/lib/connect-wallet/config/connectors";

export const getConnector = (chainId) => {
  const rpcUrl = rpcUrls[chainId];

  const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });

  return walletconnect;
};

console.log("walletconnect connector loaded");
