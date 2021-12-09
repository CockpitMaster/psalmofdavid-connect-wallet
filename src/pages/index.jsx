import Head from "next/head";
import { useEagerConnect } from "@/lib/connect-wallet/hooks/useEagerConnect";
import WalletConnectDialog from "@/components/ConnectWallet/ConnectWallet";

export default function Home() {
  useEagerConnect();

  return (
    <div>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-900 tracking-tight mb-8">
          Welcome to Neptune Mutual
        </h1>
        <WalletConnectDialog />
      </main>
    </div>
  );
}
