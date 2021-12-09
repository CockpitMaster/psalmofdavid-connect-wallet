import { ConnectorNames } from "../config/connectors";
import chains from "../config/constants/chains";

const getParams = (chainId) => {
    const { networkId, ...params } = chains.find(
        (x) => x.networkId === chainId
    );

    return params;
};

export const setupNetwork = async (selectedChainId, connectorName) => {
    if (!selectedChainId) {
        return false;
    }

    switch (connectorName) {
        case ConnectorNames.Injected:
        default: {
            const provider = window.ethereum;

            if (!provider) {
                console.error(
                    "Can't setup network - window.ethereum is undefined"
                );
                return false;
            }

            try {
                await provider.request({
                    method: "wallet_addEthereumChain",
                    params: [getParams(selectedChainId)],
                });

                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    }
};
