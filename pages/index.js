import Head from 'next/head'
import styles from '../styles/Home.module.css'
import WalletConnectDialog from '../components/WalletConnectDialog'
import { useEagerConnect } from '../hooks/useEagerConnect'

export default function Home() {

  useEagerConnect()

  return (
    <div className={styles.container}>
      <Head>
        <title>Neptune Mutual</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://neptunemutual.com">Neptune Mutual !</a>
        </h1>
        <WalletConnectDialog />
      </main>
    </div>
  )
}
