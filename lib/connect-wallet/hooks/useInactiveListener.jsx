import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ConnectorNames } from "../config/connectors";
import { ACTIVE_CONNECTOR_KEY } from "../config/localstorage";
import useAuth from "./useAuth";

export function useInactiveListener(networkId) {
  const { login, logout } = useAuth(networkId);
  const { active, error, activate } = useWeb3React();

  useEffect(() => {
    const { ethereum } = window;

    const connectorName = window.localStorage.getItem(ACTIVE_CONNECTOR_KEY);

    if (connectorName !== ConnectorNames.Injected) {
      return;
    }

    if (ethereum && ethereum.on && !active && !error) {
      const handleChainChanged = async (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        await logout();
        login(ConnectorNames.Injected, networkId);
      };
      const handleAccountsChanged = async (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          await logout();
          login(ConnectorNames.Injected, networkId);
        }
      };
      // const handleConnect = async () => {
      //   console.log("Handling 'connect' event");
      //   await logout();
      //   login(ConnectorNames.Injected, networkId);
      // };
      // const handleNetworkChanged = async (networkId) => {
      //   console.log("Handling 'networkChanged' event with payload", networkId);
      //   await logout();
      //   login(ConnectorNames.Injected, networkId);
      // };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      // ethereum.on("connect", handleConnect);
      // ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          // ethereum.removeListener("connect", handleConnect);
          // ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate, login, logout, networkId]);

  useEffect(() => {
    const { BinanceChain } = window;

    const connectorName = window.localStorage.getItem(ACTIVE_CONNECTOR_KEY);

    if (connectorName !== ConnectorNames.BSC) {
      return;
    }

    if (BinanceChain && BinanceChain.on && !active && !error) {
      const handleChainChanged = async (chainId) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        await logout();
        login(ConnectorNames.BSC, networkId);
      };
      const handleAccountsChanged = async (accounts) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          await logout();
          login(ConnectorNames.BSC, networkId);
        }
      };
      // const handleConnect = async () => {
      //   console.log("Handling 'connect' event");
      //   await logout();
      //   login(ConnectorNames.BSC, networkId);
      // };
      // const handleNetworkChanged = async (networkId) => {
      //   console.log("Handling 'networkChanged' event with payload", networkId);
      //   await logout();
      //   login(ConnectorNames.BSC, networkId);
      // };

      BinanceChain.on("chainChanged", handleChainChanged);
      BinanceChain.on("accountsChanged", handleAccountsChanged);
      // BinanceChain.on("connect", handleConnect);
      // BinanceChain.on("networkChanged", handleNetworkChanged);

      return () => {
        if (BinanceChain.removeListener) {
          BinanceChain.removeListener("chainChanged", handleChainChanged);
          BinanceChain.removeListener("accountsChanged", handleAccountsChanged);
          // BinanceChain.removeListener("connect", handleConnect);
          // BinanceChain.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate, login, logout, networkId]);
}
