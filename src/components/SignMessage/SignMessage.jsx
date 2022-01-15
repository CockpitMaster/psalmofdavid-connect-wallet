import { Button } from "@/components/Button";
import { DataDisplay } from "@/components/DataDisplay";
import { getSigner } from "@/lib/connect-wallet/utils/web3";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

export const SignMessage = () => {
  const [signature, setSignature] = useState("");
  const { active, library } = useWeb3React();

  if (!active) {
    return null;
  }

  const signer = getSigner(library);

  const onSign = async () => {
    const _signature = await signer.signMessage("hello");
    setSignature(_signature);
  };

  return (
    <div className="pt-3 mt-16 border-t border-black">
      <Button onClick={onSign}>Sign message</Button>

      <Button onClick={() => setSignature("")}>Clear Signature</Button>

      {signature && <DataDisplay>{signature}</DataDisplay>}
    </div>
  );
};
