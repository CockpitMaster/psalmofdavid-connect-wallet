import { Dialog } from "@headlessui/react";

import useAuth from "@/lib/connect-wallet/hooks/useAuth";
import { wallets } from "@/lib/connect-wallet/config/wallets";
import { Modal } from "@/components/Modal/Modal";
import { useWeb3React } from "@web3-react/core";
import { Disclaimer } from "@/components/ConnectWallet/Disclaimer";
import { WalletList } from "@/components/ConnectWallet/WalletList";
import { useEffect, useState } from "react";

export const Popup = ({ isOpen, onClose }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { active, account } = useWeb3React();
  const { login, logout } = useAuth();

  useEffect(() => {
    if (!isOpen) setIsConnecting(false);
  }, [isOpen]);

  const onConnect = (id) => {
    if (active) {
      logout();
    }

    const wallet = wallets.find((x) => x.id === id);
    const connectorName = wallet.connectorName;
    login(connectorName);
    setIsConnecting(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="inline-block w-npm-width h-npm-height max-w-md p-12 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-npm-blue">
        <button
          className="absolute top-7 right-14 cursor-pointer"
          onClick={onClose}
        >
          <img src="/icons/close-icon.png" />
        </button>
        <Dialog.Title
          as="h3"
          className="text-3xl font-bold text-black-900 leading-9"
        >
          Connect Wallet
        </Dialog.Title>

        {!isConnecting && (
          <>
            <Disclaimer />
            <WalletList wallets={wallets} onConnect={onConnect} />
          </>
        )}

        {isConnecting && <>Connecting</>}
      </div>
    </Modal>
  );
};
