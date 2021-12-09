import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import rpcUrls from "../config/rpcUrls";
import { getOne } from "./random";

//import { POLLING_INTERVAL } from '../config/connectors'
//import getNodeUrl from './blockchain/getRpcUrl'

const selectCorrespondingChainUrl = rpcUrls[parseInt(CHAIN_ID, 10)];

export const getProvider = () => {
  const rpcUrl = getOne(...selectCorrespondingChainUrl);
  console.log("rpcUrl", rpcUrl);
  const library = new JsonRpcProvider(rpcUrl);
  console.log(library);
  //library.pollingInterval = POLLING_INTERVAL
  return library;
};
