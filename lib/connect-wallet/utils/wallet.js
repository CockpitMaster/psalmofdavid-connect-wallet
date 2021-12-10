import { ConnectorNames } from "../config/connectors";
import { chains, CHAIN_ID } from "../config/chains";

/**
 *
 * @param {number} networkId
 * @returns
 */
const getNetworkParams = (networkId) => {
  const { id, ...params } = chains.find((x) => x.networkId === networkId);

  return params;
};

export const setupNetwork = async (connectorName) => {
  const networkId = parseInt(CHAIN_ID, 10);

  switch (connectorName) {
    case ConnectorNames.Injected:
    default: {
      const provider = window.ethereum;

      if (!provider) {
        console.error("Can't setup network - window.ethereum is undefined");
        return false;
      }

      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [getParams(networkId)],
        });

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
