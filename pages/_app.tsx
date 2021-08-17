import type { AppProps } from 'next/app'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

import Header from '@/components/layout/Header'
import { StackProvider } from '@/context/stack'

function MyApp({ Component, pageProps }: AppProps) {
  const config = {
    useSystemColorMode: true,
  }

  const customTheme = extendTheme({ config })

  return (
    <ChakraProvider theme={customTheme}>
      <StackProvider>
        <Header />
        <Component {...pageProps} />
      </StackProvider>
    </ChakraProvider>
  )
}
export default MyApp
