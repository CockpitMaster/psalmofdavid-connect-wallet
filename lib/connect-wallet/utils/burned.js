import { getBurnedData } from "@/lib/connect-wallet/config/tokenBurns";
import { sumOf } from "@/lib/connect-wallet/utils/bignumbers";
import BigNumber from "bignumber.js";

export const getBurnedByChainId = (networkId) => {
  try {
    const tokenBurns = getBurnedData(networkId);
    return sumOf(...tokenBurns.map((x) => x.amount));
  } catch (error) {
    console.log("Could not get burned amount for", networkId);
  }

  return new BigNumber(0);
};
