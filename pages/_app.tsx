import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  return ( 
  <SWRConfig value={{
    fetcher: (url: string) =>
      fetch(url).then((res) => res.json())
  }}>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  </SWRConfig>)
}

export default MyApp
