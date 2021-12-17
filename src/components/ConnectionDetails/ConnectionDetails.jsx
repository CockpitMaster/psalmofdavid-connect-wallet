import { useWeb3React } from "@web3-react/core";

import { NetworkNames } from "@/lib/connect-wallet/config/chains";

export const ConnectionDetails = () => {
  const { active, account, chainId } = useWeb3React();

  if (!active) {
    return null;
  }

  return (
    <>
      <pre className="max-w-prose break-words whitespace-pre-wrap mt-6 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {account}
      </pre>
      {/* <div className="max-w-prose mt-6 bg-gray-50 text-gray-700 hover:text-gray-900 font-mono leading-6 py-3 sm:px-6 border border-gray-200 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-300 focus:outline-none transition-colors duration-200">
        {NetworkNames[chainId]}
      </div> */}
    </>
  );
};
