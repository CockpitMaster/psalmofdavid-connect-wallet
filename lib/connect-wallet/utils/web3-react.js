import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import rpcUrls from '../config/constants/rpcUrls'
import { getOne } from './random'

//import { POLLING_INTERVAL } from '../config/constants/connectors'
//import getNodeUrl from './blockchain/getRpcUrl'

//get chain id from .env
const configured = parseInt(process.env.NEXT_PUBLIC_BINANCE_MAINNET_CHAIN_ID, 10)
const selectCorrespondingChainUrl = rpcUrls[configured]


export const getProvider = () => {
  
  const rpcUrl = getOne(...selectCorrespondingChainUrl)
  console.log('rpcUrl',rpcUrl)
  const library = new JsonRpcProvider(rpcUrl)
  console.log(library)
  //library.pollingInterval = POLLING_INTERVAL
  return library
}
