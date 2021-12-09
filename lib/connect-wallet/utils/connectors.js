import { InjectedConnector } from "@web3-react/injected-connector";
import { ConnectorNames } from "@/lib/connect-wallet/config/connectors";
import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";

/**
 *
 * @param {number} chainId
 */
export const getInjectedConnector = () => {
  const chainId = parseInt(CHAIN_ID, 10);
  const connector = new InjectedConnector({ supportedChainIds: [chainId] });

  return connector;
};

export const getConnectorByName = (name) => {
  switch (name) {
    case ConnectorNames.Injected:
      return getInjectedConnector();

    default:
      return null;
  }
};
