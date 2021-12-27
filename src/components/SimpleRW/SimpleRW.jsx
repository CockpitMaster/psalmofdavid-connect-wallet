import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";

import { getProviderOrSigner } from "@/lib/connect-wallet/utils/web3";
import * as contracts from "@/src/config/contracts";
import SimpleRWABI from "@/src/config/abis/SimpleRW.json";
import { CHAIN_ID } from "@/src/config/environment";
import { AddressZero } from "@ethersproject/constants";
import { NetworkNames } from "@/lib/connect-wallet/config/chains";
import { DataDisplay } from "@/components/DataDisplay";
import { Button } from "@/components/Button";

const networkId = parseInt(CHAIN_ID, 10);

export const SimpleRW = () => {
  const [signature, setSignature] = useState("abc");
  const [count, setCount] = useState("");
  const [whoami, setWhoAmI] = useState("");
  const { active, library, account } = useWeb3React();

  if (!contracts.SimpleRW[networkId]) {
    return (
      <div className="pt-6 mt-16 border-t border-d4dfee">
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
    <div className="pt-3 mt-16 border-t border-d4dfee">
      <Button onClick={onIncrement}>Increment Count</Button>
      <Button onClick={fetchCount}>Read Count</Button>
      <Button onClick={fetchWhoAmI}>Who Am I?</Button>

      <h4 className="font-semibold mt-6">Count</h4>
      <DataDisplay>{count}&nbsp;</DataDisplay>

      <h4 className="font-semibold mt-6">
        Who Am I?{" "}
        <small className="font-normal">
          <em>(Has Fallback Address)</em>
        </small>{" "}
      </h4>
      <DataDisplay>{whoami}&nbsp;</DataDisplay>
    </div>
  );
};
