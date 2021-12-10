import { useState } from "react";
import Image from "next/image";

import { useWeb3React } from "@web3-react/core";
import useAuth from "src/hooks/useAuth";
import { Popup } from "./Popup";
import { NetworkNames } from "@/lib/connect-wallet/config/chains";

export default function ConnectWallet() {
  const { active, account, chainId } = useWeb3React();
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
        className="mt-6 bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        {active ? "Connected Wallet" : "Connect Wallet"}
      </button>
      <div className="max-w-prose mt-6 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {active ? account : null}
      </div>
      <div className="max-w-prose mt-6 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {active && <>{NetworkNames[chainId]}</>}
      </div>
      <Popup isOpen={isOpen} onClose={onClose} />
    </>
  );
}
