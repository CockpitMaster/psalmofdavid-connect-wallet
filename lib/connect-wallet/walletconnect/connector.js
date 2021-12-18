import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { POLLING_INTERVAL } from "@/lib/connect-wallet/config/connectors";
import { getNodeUrl } from "@/lib/connect-wallet/utils/getRpcUrl";

/**
 *
 * @param {number} networkId
 * @returns
 */
export const getConnector = (networkId) => {
  const rpcUrl = getNodeUrl(networkId);

  const walletconnect = new WalletConnectConnector({
    rpc: { [networkId]: rpcUrl },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
    supportedChainIds: [networkId],
  });

  return walletconnect;
};

console.log("walletconnect connector loaded");
