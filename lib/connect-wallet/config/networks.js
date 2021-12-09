export const networks = [
    {
        id: 56,
        name: "Binance Smart Chain Network",
        displayName: "Binance",
        shortName: "BSC Mainnet",
    },
    {
        id: 97,
        name: "Binance Smart Chain Test Network",
        displayName: "Binance Testnet",
        shortName: "BSC Testnet",
    },
];

const FALLBACK_CHAIN_ID = process.env.NEXT_PUBLIC_BINANCE_TESTNET_CHAIN_ID

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => {
    return networks.find((x) => x.id === networkId);
};
