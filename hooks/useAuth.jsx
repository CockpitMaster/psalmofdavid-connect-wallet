import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import { useCallback } from "react";
import { ACTIVE_CHAIN_KEY, ACTIVE_CONNECTOR_KEY } from "../config/constants";
import { networks } from "../config/networks";
import { wallets } from "../config/wallets";
import { getConnectorByName } from "../utils/blockchain/connectors";
import { setupNetwork } from "../utils/wallet";

const useAuth = () => {
    const { activate, deactivate, chainId } = useWeb3React();

    const login = useCallback(
        (connectorName, networkId) => {
            const connector = getConnectorByName(connectorName, networkId);

            if (connector) {
                window.localStorage.setItem(
                    ACTIVE_CONNECTOR_KEY,
                    connectorName
                );
                window.localStorage.setItem(ACTIVE_CHAIN_KEY, networkId);

                activate(connector, async (error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        const hasSetup = await setupNetwork(
                            networkId,
                            connectorName
                        );

                        if (hasSetup) {
                            activate(connector, () => {
                                window.localStorage.removeItem(
                                    ACTIVE_CONNECTOR_KEY
                                );
                                window.localStorage.removeItem(
                                    ACTIVE_CHAIN_KEY
                                );
                            });
                            return;
                        }

                        window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
                        window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

                        const wallet = wallets.find(
                            (wallet) => wallet.connectorName === connectorName
                        );
                        const network = networks.find(
                            (network) => network.id === networkId
                        );

                        console.log("error", {
                            title: "Wrong network",
                            message: `Please switch to <strong></strong> in your <strong></strong> wallet`,
                        });
                    } else {
                        window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
                        window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

                        if (error instanceof NoEthereumProviderError) {
                            console.log("error", {
                                title: "Provider Error",
                                message: "Could not connect. No provider found",
                            });
                            return;
                        }

                        if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof
                                UserRejectedRequestErrorWalletConnect
                        ) {
                            if (connector instanceof WalletConnectConnector) {
                                const walletConnector = connector;
                                walletConnector.walletConnectProvider = null;
                            }
                            console.log("error", {
                                title: "Authorization Error",
                                message:
                                    "Please authorize to access your account",
                            });
                            return;
                        }
                        console.log(error.name, error.message);
                    }
                });
            } else {
                console.error(
                    "Unable to find connector: Could not identify from local storage"
                );
            }
        },
        [activate]
    );

    const logout = useCallback(() => {
        deactivate();
        window.localStorage.removeItem(ACTIVE_CONNECTOR_KEY);
        window.localStorage.removeItem(ACTIVE_CHAIN_KEY);

        // This localStorage key is set by @web3-react/walletconnect-connector
        if (window.localStorage.getItem("walletconnect")) {
            const connector = getConnectorByName(
                ConnectorNames.WalletConnect,
                chainId
            );
            connector.close();
            connector.walletConnectProvider = null;
        }
    }, [deactivate, chainId]);

    return { logout, login }
};

export default useAuth;