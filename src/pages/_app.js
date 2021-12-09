import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Web3ReactProvider } from "@web3-react/core";

import { getProvider } from "../../lib/connect-wallet/utils/web3-react";

function MyApp({ Component, pageProps }) {
    return (
        <Web3ReactProvider getLibrary={getProvider}>
            <Component {...pageProps} />
        </Web3ReactProvider>
    );
}

export default MyApp;
