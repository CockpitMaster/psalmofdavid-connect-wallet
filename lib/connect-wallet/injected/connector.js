import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { rpcUrls } from "@/lib/connect-wallet/config/rpcUrls";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { POLLING_INTERVAL } from "@/lib/connect-wallet/config/connectors";
/**
 *
 * @param {number} chainId
 */
export const getConnector = (chainId) => {
  const connector = new InjectedConnector({ supportedChainIds: [chainId] });

  return connector;
};

export const getBscConnector = (chainId) => {
  const bscConnector = new BscConnector({ supportedChainIds: [chainId] });

  return bscConnector;
};

export const getWalletConnect = (chainId) => {
  const rpcUrl = rpcUrls[chainId];

  const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
  });

  return walletconnect;
};
