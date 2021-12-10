import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";
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
import { ACTIVE_CONNECTOR_KEY } from "../config/localstorage";
import { getConnectorByName } from "../utils/connectors";
import { setupNetwork } from "../utils/wallet";

const useAuth = () => {
  const { activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorName) => {
      const networkId = parseInt(CHAIN_ID, 10);
      const connector = getConnectorByName(connectorName, networkId);

      if (!connector) {
        console.error(
          "Unable to find connector: Could not identify from local storage"
        );
      }

      window.localStorage.setItem(ACTIVE_CONNECTOR_KEY, connectorName);

      activate(connector, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork(connectorName);

          if (hasSetup) {
            activate(connector, () => {
              window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
            });
            return;
          }

          window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);

          console.log("error", {
            title: "Wrong network",
            message: `Please switch to <strong></strong> in your <strong></strong> wallet`,
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
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector;
              walletConnector.walletConnectProvider = null;
            }
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
    if (window.localStorage.getItem("walletconnect")) {
      const connector = getConnectorByName(
        ConnectorNames.WalletConnect,
        networkId
      );
      connector.close();
      connector.walletConnectProvider = null;
    }
  }, [deactivate]);

  return { logout, login };
};

export default useAuth;
