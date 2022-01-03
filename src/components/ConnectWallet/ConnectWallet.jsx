import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import useAuth from "src/hooks/useAuth";
import { Popup } from "./Popup";
import { ChainLogos, NetworkNames } from "@/lib/connect-wallet/config/chains";
import { networkId } from "@/src/config/environment";
import { Button } from "@/components/Button";

export default function ConnectWallet() {
  const [isOpen, setIsOpen] = useState(false);

  const { active } = useWeb3React();

  const { logout } = useAuth(networkId);

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

  const ChainLogo = ChainLogos[networkId] || ChainLogos[1];

  const network = (
    <div className="flex items-center mt-6 mr-4 bg-white text-black font-semibold py-3 px-6 border border-d4dfee rounded-xl">
      <ChainLogo width={24} height={24} />{" "}
      <p className="block ml-2">{NetworkNames[networkId]}</p>
    </div>
  );

  return (
    <>
      <div className="flex items-center">
        {network} {button}
      </div>
      <Popup isOpen={isOpen} onClose={onClose} />
    </>
  );
}
