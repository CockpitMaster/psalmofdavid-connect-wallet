import rpcUrls from "./rpcUrls";

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

export const chains = [
  {
    id: 56,
    chainId: `0x${(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${56}`],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  {
    id: 97,
    chainId: `0x${(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: rpcUrls[`${97}`],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
];

export const NetworkNames = {
  56: "BSC Mainnet",
  97: "BSC Testnet",
};
