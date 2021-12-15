import {
  bsc_mainnet_addresses as mainnet,
  bsc_testnet_addresses as testnet,
} from "./constants";
import abis from "./abis";

export const getDiscoveryContractInfo = (networkId) => {
  if (networkId === 97) {
    return {
      address: testnet.contracts.v1.DISCOVERY,
      abi: abis.discovery,
    };
  }

  return {
    address: mainnet.contracts.v1.DISCOVERY,
    abi: abis.discovery,
  };
};

export const getNEPToken = (networkId) => {
  if (networkId === 97) {
    return {
      address: testnet.tokens.NEP,
      explorer: `https://testnet.bscscan.com/token/${testnet.tokens.NEP}`,
      abi: abis.ierc20,
    };
  }

  return {
    address: mainnet.tokens.NEP,
    explorer: `https://bscscan.com/token/${mainnet.tokens.NEP}`,
    abi: abis.ierc20,
  };
};

export const getLinks = (networkId) => {
  if (networkId === 97) {
    return {
      tokenOnPancakeExchange:
        "https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s",
    };
  }

  return {
    tokenOnPancakeExchange:
      "https://exchange.pancakeswap.finance/#/swap?outputCurrency=%s",
  };
};
