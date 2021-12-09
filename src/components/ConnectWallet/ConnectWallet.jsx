import { useState } from "react";
import Image from "next/image";

import { useWeb3React } from "@web3-react/core";
import useAuth from "@/lib/connect-wallet/hooks/useAuth";
import { Popup } from "./Popup";
import { CHAIN_ID } from "@/lib/connect-wallet/config/chains";

export default function ConnectWallet() {
  const { active, account } = useWeb3React();
  let [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const [walletId, setWalletId] = useState();

  function onClose() {
    setIsOpen(false);
  }

  function onOpen() {
    if (active) {
      logout();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="w-full sm:w-auto flex-none bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        {active ? "Connected Wallet" : "Connect Wallet"}
      </button>
      <span className="text-green-500  pl-4">{active ? account : null}</span>
      <Popup isOpen={isOpen} onClose={onClose} />
    </>
  );
}
