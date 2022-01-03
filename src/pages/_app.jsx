import "tailwindcss/tailwind.css";
import { Web3ReactProvider } from "@web3-react/core";

import { getLibrary } from "@/lib/connect-wallet/utils/web3";
import { AppProvider } from "@/src/context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
