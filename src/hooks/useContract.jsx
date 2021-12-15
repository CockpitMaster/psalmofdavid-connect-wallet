import { getContract } from "@/lib/connect-wallet/utils/contract";
import { useWeb3React } from "@web3-react/core";

export const useContract = ({ contract }) => {
  const { library, account } = useWeb3React();

  try {
    /* console.log("contract", contract.address);
    console.log("library", library);
    console.log("contract abi", contract.abi);
    console.log("account", account); */
    const instance = getContract(
      contract.address,
      library,
      contract.abi,
      account
    );

    return instance;
  } catch (error) {
    console.error("Could not get contract", error);
  }

  return null;
};
