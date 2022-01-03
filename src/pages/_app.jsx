import "tailwindcss/tailwind.css";
import { Web3ReactProvider } from "@web3-react/core";

import { getLibrary } from "@/lib/connect-wallet/utils/web3";
import { useEagerConnect } from "@/lib/connect-wallet/hooks/useEagerConnect";
import { useInactiveListener } from "@/lib/connect-wallet/hooks/useInactiveListener";
import { networkId } from "@/src/config/environment";

function MyApp({ Component, pageProps }) {
  useEagerConnect(networkId);
  useInactiveListener(networkId);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
