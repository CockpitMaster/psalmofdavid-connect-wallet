import { ConnectorNames } from "./connectors";

export const wallets = [
  {
    id: "1",
    name: "MetaMask",
    enabledIcon: "/networks/metamask.svg",
    disabledIcon: "/networks/metamask-disabled.svg",
    connectorName: ConnectorNames.Injected,
    iconSrc: "/icons/metamask-icon.png",
  },
  {
    id: "2",
    name: "Binance Chain Wallet",
    iconSrc: "/icons/binance-icon.png",
    buttonText: "Binance Chain Wallet",
  },
  {
    id: "3",
    name: "Wallet Connect",
    iconSrc: "/icons/wallet-connect-icon.png",
    buttonText: "Wallet Connect",
  },
];
