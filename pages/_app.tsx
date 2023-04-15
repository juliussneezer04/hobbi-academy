import '@/styles/globals.css'
import { Auth0Provider } from '@auth0/auth0-react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}
