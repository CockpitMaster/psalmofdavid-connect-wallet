import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import useAuth from "src/hooks/useAuth";
import { Popup } from "./Popup";
import { NetworkNames } from "@/lib/connect-wallet/config/chains";
import { CHAIN_ID } from "@/src/config/environment";

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

  let button = (
    <button
      type="button"
      onClick={onOpen}
      className="mt-6 bg-gray-900 hover:bg-gray-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
    >
      Connect Wallet
    </button>
  );

  if (active) {
    button = (
      <button
        type="button"
        onClick={logout}
        className="mt-6 bg-white hover:bg-gray-100 text-gray-900 text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Disconnect
      </button>
    );
  }

  const network = (
    <div className="inline-block mt-6 mr-4 bg-green-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200">
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
