import { FALLBACK_CHAIN_ID } from '../../config/constants/chains.js'
import rpcUrls from '../../config/constants/rpcUrls'
import { getOne } from '../random'

// Used if no metamask or any wallet is connected
const getNodeUrl = (chainId) => {
  console.log("fallback chain", FALLBACK_CHAIN_ID)
  const nodes = rpcUrls[chainId || FALLBACK_CHAIN_ID]

  return getOne(...nodes)
}

export default getNodeUrl
