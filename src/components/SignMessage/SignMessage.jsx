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
    const signature = await signer.signMessage("hello");
    setSignature(signature);
  };

  return (
    <div className="pt-3 mt-16 border-t border-gray-400">
      <button
        type="button"
        onClick={onSign}
        className="mt-6 mr-4 bg-blue-900 hover:bg-blue-700 text-white text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Sign message
      </button>

      <button
        type="button"
        onClick={() => setSignature("")}
        className="mt-6 bg-white hover:bg-red-300 text-black text-lg leading-6 font-semibold py-3 px-6 border border-transparent rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
      >
        Clear Signature
      </button>

      {signature && (
        <pre className="max-w-prose break-words whitespace-pre-wrap mt-6 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
          {signature}
        </pre>
      )}
    </div>
  );
};
