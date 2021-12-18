import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import { getProviderOrSigner } from "@/lib/connect-wallet/utils/web3";
import * as contracts from "@/src/config/contracts";
import SimpleRWABI from "@/src/config/abis/SimpleRW.json";
import { CHAIN_ID } from "@/src/config/environment";
import { AddressZero } from "@ethersproject/constants";
import { NetworkNames } from "@/lib/connect-wallet/config/chains";

const networkId = parseInt(CHAIN_ID, 10);

export const SimpleRW = () => {
  const [signature, setSignature] = useState("abc");
  const [count, setCount] = useState("");
  const [whoami, setWhoAmI] = useState("");
  const { active, library, account } = useWeb3React();

  if (!contracts.SimpleRW[networkId]) {
    return (
      <div className="pt-6 mt-16 border-t border-gray-400">
        <strong className="font-semibold">SimpleRW Contract</strong> not
        deployed on{" "}
        <strong className="font-semibold">{NetworkNames[networkId]}</strong>
      </div>
    );
  }

  const fetchWhoAmI = async () => {
    // Throws error without fallback(AddressZero) account
    const signerOrProvider = getProviderOrSigner(
      library,
      account || AddressZero,
      networkId
    );

    if (!signerOrProvider) {
      console.log("No provider found");
    }

    const instance = new Contract(
      contracts.SimpleRW[networkId],
      SimpleRWABI,
      signerOrProvider
    );

    if (!instance) {
      console.log("No instance found");
    }

    const result = await instance.whoami();
    setWhoAmI(result.toString());
  };

  const fetchCount = async () => {
    const signerOrProvider = getProviderOrSigner(library, account, networkId);

    if (!signerOrProvider) {
      console.log("No provider found");
    }

    const instance = new Contract(
      contracts.SimpleRW[networkId],
      SimpleRWABI,
      signerOrProvider
    );

    if (!instance) {
      console.log("No instance found");
    }

    const result = await instance.count();
    setCount(result.toString());
  };

  const onIncrement = async () => {
    const signerOrProvider = getProviderOrSigner(library, account, networkId);

    if (!signerOrProvider) {
      console.log("No provider found");
    }

    const instance = new Contract(
      contracts.SimpleRW[networkId],
      SimpleRWABI,
      signerOrProvider
    );

    if (!instance) {
      console.log("No instance found");
    }

    const tx = await instance.increment(1);
    console.log(tx);

    await fetchCount();
  };

  return (
    <div className="pt-3 mt-16 border-t border-gray-400">
      <button
        type="button"
        onClick={onIncrement}
        className="mt-6 mr-4 bg-blue-900 hover:bg-blue-800 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Increment Count
      </button>
      <button
        type="button"
        onClick={fetchCount}
        className="mt-6 mr-4 bg-green-900 hover:bg-green-800 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Read Count
      </button>
      <button
        type="button"
        onClick={fetchWhoAmI}
        className="mt-6 mr-4 bg-green-900 hover:bg-green-800 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Who Am I?
      </button>

      <h4 className="font-semibold mt-6">Count</h4>
      <pre className="max-w-prose break-words whitespace-pre-wrap mt-2 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {count}&nbsp;
      </pre>

      <h4 className="font-semibold mt-6">
        Who Am I?{" "}
        <small className="font-normal">
          <em>(Has Fallback Address)</em>
        </small>{" "}
      </h4>
      <pre className="max-w-prose break-words whitespace-pre-wrap mt-2 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {whoami}&nbsp;
      </pre>
    </div>
  );
};
