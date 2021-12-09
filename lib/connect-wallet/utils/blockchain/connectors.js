import { InjectedConnector } from "@web3-react/injected-connector";
import { ConnectorNames } from "../../config/connectors";
import { networks } from "../../config/networks";

const supportedChainIds = networks.map((network) => network.id);

export const wrapperInjectedConnector = new InjectedConnector({
    supportedChainIds,
});

export const getInjectedConnector = (chainId) => {
    const supportedChainIds = [chainId];
    const connector = new InjectedConnector({ supportedChainIds });

    return connector;
};

export const getConnectorByName = (name, chainId) => {
    if (!chainId) return null;

    switch (name) {
        case ConnectorNames.Injected:
            return getInjectedConnector(chainId);

        default:
            return null;
    }
};
