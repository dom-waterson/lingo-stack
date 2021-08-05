import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import Header from '@/components/layout/Header'
import { StackProvider } from '@/context/stack'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StackProvider>
        <Header />
        <Component {...pageProps} />
      </StackProvider>
    </ChakraProvider>
  )
}
export default MyApp
