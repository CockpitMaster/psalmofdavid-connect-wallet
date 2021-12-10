import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";
import { getNodeUrl } from "@/lib/connect-wallet/utils/getRpcUrl";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { getOne } from "./random";

export const POLLING_INTERVAL = 12000;

// Fallback Provider
export const getProvider = (networkId) => {
  const rpcUrl = getNodeUrl(networkId);
  const library = new JsonRpcProvider(rpcUrl);

  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

// Used if wallet is connected
export const getLibrary = (provider) => {
  const library = new Web3Provider(provider);

  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked();
};

/**
 *
 * @param {Web3Provider} _library
 * @param {string=} account
 * @returns
 */
export const getProviderOrSigner = (_library, account) => {
  let library = _library;

  if (!library) {
    const networkId = parseInt(CHAIN_ID, 10);
    library = getProvider(networkId);
  }

  if (!account) {
    return library;
  }

  return getSigner(library, account);
};
