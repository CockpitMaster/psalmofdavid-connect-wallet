import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import useAuth from "src/hooks/useAuth";
import { Popup } from "./Popup";
import { NetworkNames } from "@/lib/connect-wallet/config/chains";
import { CHAIN_ID } from "@/src/config/environment";
import { Button } from "@/components/Button";

export default function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false);

  const { active, account, chainId } = useWeb3React();

  const { logout } = useAuth();

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    if (active) {
      logout();
    }

    setIsOpen(true);
  }

  let button = <Button onClick={onOpen}>Connect Wallet</Button>;

  if (active) {
    button = <Button onClick={logout}>Disconnect</Button>;
  }

  const network = (
    <div className="inline-block mt-6 mr-4 bg-white text-black font-semibold py-3 px-6 border border-d4dfee rounded-xl">
      {NetworkNames[parseInt(CHAIN_ID, 10)]}
    </div>
  );

  return (
    <>
      {network} {button}
      <Popup isOpen={isOpen} onClose={onClose} />
    </>
  );
}
