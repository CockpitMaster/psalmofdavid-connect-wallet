import { InjectedConnector } from "@web3-react/injected-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
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
