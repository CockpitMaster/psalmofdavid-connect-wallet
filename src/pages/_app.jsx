import "tailwindcss/tailwind.css";
import { Web3ReactProvider } from "@web3-react/core";

import { getLibrary } from "@/lib/connect-wallet/utils/web3";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
