import { getInjectedConnector } from "../utils/blockchain/connectors";
import { ConnectorNames } from "./connectors";

export const wallets = [
    {
        id: "1",
        name: "MetaMask",
        enabledIcon: "/networks/metamask.svg",
        disabledIcon: "/networks/metamask-disabled.svg",
        connector: getInjectedConnector,
        connectorName: ConnectorNames.Injected,
    },
];
