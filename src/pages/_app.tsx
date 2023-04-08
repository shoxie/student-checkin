import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '@/Layout'
import { NotificationProvider } from '@/context/notification'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ChakraProvider>
      <NotificationProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationProvider>
    </ChakraProvider>
  )
}
