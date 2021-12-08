import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Web3ReactProvider } from "@web3-react/core";

import { getLibrary } from "../utils/web3-react";

function MyApp({ Component, pageProps }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Component {...pageProps} />
        </Web3ReactProvider>
    );
}

export default MyApp;
