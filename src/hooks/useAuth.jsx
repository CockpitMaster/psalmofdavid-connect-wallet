//import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestErrorInjected,
} from "@/lib/connect-wallet/injected/errors";
import {
  UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@/lib/connect-wallet/walletconnect/errors";
import { useCallback } from "react";
import { ACTIVE_CONNECTOR_KEY } from "../../lib/connect-wallet/config/localstorage";
import { getConnectorByName } from "../../lib/connect-wallet/utils/connectors";
import { setupNetwork } from "../../lib/connect-wallet/utils/wallet";
import { ConnectorNames } from "@/lib/connect-wallet/config/connectors";
import { wallets } from "@/lib/connect-wallet/config/wallets";

const useAuth = () => {
  const { activate, deactivate, chainId } = useWeb3React();

  const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
  const networkInformation = [
    {
      id: 56,
      name: "Binance Smart Chain Network",
    },
  ];
  const defaultNetworkId = parseInt(CHAIN_ID, 10);
  const login = useCallback(
    (connectorName, networkId = defaultNetworkId) => {
      const connector = getConnectorByName(connectorName, networkId);

      if (!connector) {
        console.error(
          "Unable to find connector: Could not identify from local storage"
        );
      }

      window.localStorage.setItem(ACTIVE_CONNECTOR_KEY, connectorName);

      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork(connectorName, networkId);

          if (hasSetup) {
            activate(connector, () => {
              window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
            });
            return;
          }

          window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);

          const wallet = wallets.find(
            (wallet) => wallet.connectorName === connectorName
          );

          const network = networkInformation.find((x) => x.id === networkId);
          console.log("error", {
            title: "Wrong network",
            message: `Please switch to <strong>${network.name}</strong> in your <strong>${wallet.name}</strong> wallet`,
          });
        } else {
          window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);

          if (error instanceof NoEthereumProviderError) {
            console.log("error", {
              title: "Provider Error",
              message: "Could not connect. No provider found",
            });
            return;
          }

          if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            /* if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector;
              walletConnector.walletConnectProvider = null;
            } */
            console.log("error", {
              title: "Authorization Error",
              message: "Please authorize to access your account",
            });
            return;
          }
          console.log(error.name, error.message);
        }
      });
    },
    [activate]
  );

  const logout = useCallback(() => {
    const networkId = parseInt(CHAIN_ID, 10);

    deactivate();
    window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);

    // This localStorage key is set by @web3-react/walletconnect-connector
    /* if (window.localStorage.getItem("walletconnect")) {
      const connector = getConnectorByName(
        ConnectorNames.WalletConnect,
        networkId
      );
      connector.close();
      connector.walletConnectProvider = null;
    } */
  }, [deactivate]);

  return { logout, login };
};

export default useAuth;
